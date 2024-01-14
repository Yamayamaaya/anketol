import type { FormEvent } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Timestamp } from 'firebase/firestore'
import type { Questionnaire } from '@src/types/questionnaire'

type Props = {
  questionnaire: Questionnaire
  setQuestionnaire: (questionnaire: Questionnaire) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  inputError: string
}

const QuestionnaireForm = ({
  questionnaire,
  setQuestionnaire,
  onSubmit,
  inputError,
}: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 text-left border w-80 md:w-96 rounded-xl shadow-xl bg-white flex flex-col"
    >
      <FormControl>
        <FormLabel>タイトル</FormLabel>
        <Input
          type="text"
          value={questionnaire.title}
          placeholder="アンケートタイトル"
          onChange={(e) =>
            setQuestionnaire({ ...questionnaire, title: e.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel className="pt-3">有効期限</FormLabel>
        <DatePicker
          selected={questionnaire.expiry ? questionnaire.expiry.toDate() : null}
          onChange={(date) =>
            setQuestionnaire({
              ...questionnaire,
              expiry: date ? Timestamp.fromDate(date) : null,
            })
          }
          placeholderText="有効期限"
          className="border border-gray-200 rounded-md w-[270px] md:w-[20.8rem] py-2 pl-2"
        />
      </FormControl>

      <FormControl>
        <FormLabel className="pt-3">URL</FormLabel>
        <Input
          type="text"
          placeholder="googleフォームURL(回答用)"
          value={questionnaire.url}
          onChange={(e) =>
            setQuestionnaire({ ...questionnaire, url: e.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel className="pt-3">URL</FormLabel>
        <Input
          type="text"
          placeholder="googleフォームURL(編集用)"
          value={questionnaire.editUrl}
          onChange={(e) =>
            setQuestionnaire({ ...questionnaire, editUrl: e.target.value })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel className="pt-3">有効</FormLabel>
        <Checkbox
          isChecked={questionnaire.active}
          onChange={(e) =>
            setQuestionnaire({ ...questionnaire, active: e.target.checked })
          }
        />
        {questionnaire.active && (
          <p className="text-gray-500 text-sm">※他のアンケートを無効にします</p>
        )}
      </FormControl>

      <Button
        type="submit"
        px={16}
        py={0}
        colorScheme="blue"
        className="mt-6 self-center"
        size="sm"
      >
        投稿
      </Button>
      {inputError && <p className="mt-6 text-red-500">{inputError}</p>}
    </form>
  )
}

export default QuestionnaireForm
