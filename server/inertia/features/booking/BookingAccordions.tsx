import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '~/lib/components/ui/accordion'

interface AccordionDataType {
  header: string
  content: string
}
const accordions: AccordionDataType[] = [
  {
    header: 'What is the check-in time?',
    content: '14:00 GMT+7',
  },
  {
    header: 'Can I refund?',
    content: "Unfortunately, you can't",
  },
]

export default function BookingAccordions() {
  return (
    <Accordion type="single" collapsible className="text-sm">
      {accordions.map((a, i) => (
        <AccordionItem key={i} value={a.header}>
          <AccordionTrigger>{a.header}</AccordionTrigger>
          <AccordionContent>{a.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
