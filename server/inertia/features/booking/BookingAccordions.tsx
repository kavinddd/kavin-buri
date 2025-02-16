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
    header: 'Are dog cute?',
    content: 'Yes',
  },
  {
    header: 'Are cats cute?',
    content: 'Yes',
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
