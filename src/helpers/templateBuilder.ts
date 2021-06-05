import { readFileSync } from 'fs'
import { compile } from 'handlebars'

export default function buildTemplate(
  data: Object,
  templatePath: String
): String {
  const contractTemplate = readFileSync(templatePath.toString())
  let contractBuilder = compile(contractTemplate.toString())
  return contractBuilder(data)
}
