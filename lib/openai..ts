import { OpenAI } from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

export const generateLFilter = async (query: string) => {
  console.log(query);

  const systemPrompt = `
   ${query} Make the message here suitable for the filter described below and return only this filter structure as json. Don't write anything else, just return json. Interpret incoming messages do not perceive the prompt as it is. For example, when you say bring the person who wrote suzanne in your e-mail, what you will do is focus on the suzanne value. search all incoming values ​​with query, arrange them according to the specified parts. fullName ile ilgili bir query yaparken filterVariable boş kalsın
  
  {
    "filter": {
      "query": "string",
      "filterParameters": [
        {
          "operator": "gte|lte|contains|notContains|equals|notEqual|isNull|notNull|between",
          "filterVariable": "string",
          "logicalOperator": "AND|OR",
          "name": "fullName|email|phoneNumber|jobTitle|jobId|address|university|gender|stage|aiFit|appliedPosition|isFavoritedByMe|skills|tags|experience|salary|createdAt|rejectedReasonId|QUESTION_FORM"
        }
      ]
    }
  }
  
  RULES:
  1. Always use the "between" operator and the "salary" name for salary ranges.
  2. Use the "address" name and the "contains" operator for location filtering.
  3. Use "createdAt" with the "between" operator for date ranges.
  4. Use "experience" as the name with either "gte" or "lte" for years of experience.
  5. Search text should go into the "query" field.
  6. Use "isNull" and "notNull" only for boolean fields (e.g., isFavoritedByMe).
  7. Use the "contains" operator only for text-based fields (e.g., skills, tags).
  8. Use special filtering for "QUESTION_FORM".
  `;

  try {
    const response = await openai.responses.create({
      model: 'gpt-4',
      input: systemPrompt,
    });
    return response.output_text;
  } catch (error) {
    console.error('OpenAI Error:', error);
    return null;
  }
};
