const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.onAnswerLogsCreated = functions.firestore
  .document('answerLogs/{answerLogId}')
  .onCreate((snap, context) => {
    const newAnswerLog = snap.data()
    const answerLogId = context.params.answerLogId
    // 同じものがすでに保存されていないか確認
    const answerLogRef = admin
      .firestore()
      .collection('answerLogs')
      .where('formId', '==', newAnswerLog.formId)
      .where('respondentGmail', '==', newAnswerLog.respondentGmail)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 1) {
          querySnapshot.forEach((doc) => {
            if (doc.id !== answerLogId) {
              doc.ref.delete()
            }
          })
        }
      })

    updateUserAnswerCount(newAnswerLog)
    updateQuestionnaireAnsweredCount(newAnswerLog)
  })

//FIXME 以下の関数ここでいいの？
const updateUserAnswerCount = (answerLog) => {
  const userRef = admin
    .firestore()
    .collection('users')
    .where('email', '==', answerLog.respondentGmail)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 1) {
        const user = querySnapshot.docs[0].data()
        // answerCountが存在しない場合は0を初期値とする
        const currentAnswerCount = user.answerCount || 0
        const newAnswerCount = currentAnswerCount + 1
        querySnapshot.docs[0].ref.update({ answerCount: newAnswerCount })
      }
    })
}

const updateQuestionnaireAnsweredCount = (answerLog) => {
  const questionnaireRef = admin
    .firestore()
    .collection('questionnaires')
    .doc(answerLog.formId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const questionnaire = doc.data()
        // answeredCountが存在しない場合は0を初期値とする
        const currentAnsweredCount = questionnaire.answeredCount || 0
        const newAnsweredCount = currentAnsweredCount + 1
        doc.ref.update({ answeredCount: newAnsweredCount })
      }
    })
}
