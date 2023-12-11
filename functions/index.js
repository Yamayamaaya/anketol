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
    .doc(answerLog.respondentGmail)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const user = doc.data()
        const newAnswerCount = user.answerCount + 1
        doc.ref.update({ answerCount: newAnswerCount })
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
        const newAnsweredCount = questionnaire.answeredCount + 1
        doc.ref.update({ answeredCount: newAnsweredCount })
      }
    })
}
