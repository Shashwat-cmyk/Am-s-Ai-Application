import { GoogleGenAI } from "@google/genai";

// Lazily initialize the AI client
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set. Please configure it in your deployment settings.");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export interface BlogInput {
    topic: string;
    websiteUrl: string;
    wordCount: number;
}

const fetchWebsiteContent = async (url: string): Promise<string> => {
    try {
        // Use CORS proxy to bypass CORS restrictions
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch website: ${response.statusText}`);
        }

        const data = await response.json();
        const html = data.contents;

        // Basic HTML parsing to extract text content
        // Remove script and style tags
        const cleanHtml = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        // Limit to first 3000 characters to avoid token limits
        return cleanHtml.substring(0, 3000);
    } catch (error) {
        console.error("Error fetching website:", error);
        throw new Error("Unable to fetch website content. Please check the URL and try again.");
    }
};

const constructPrompt = (input: BlogInput, websiteContent: string): string => {
    return `You are an expert SEO content writer and digital marketing specialist.

**Task:** Write a comprehensive, SEO-optimized blog post.

**Blog Topic:** ${input.topic}

**Target Word Count:** ${input.wordCount} words

**Client Website Context:**
${websiteContent}

**Requirements:**

1. **SEO Optimization:**
   - Include a compelling H1 title with the main keyword
   - Use H2 and H3 subheadings strategically
   - Naturally incorporate relevant keywords throughout
   - Write a meta description (150-160 characters)
   - Ensure proper keyword density (1-2%)

2. **Content Quality:**
   - Engaging introduction that hooks the reader
   - Well-structured body with clear sections
   - Use bullet points and numbered lists where appropriate
   - Include actionable insights and practical tips
   - Strong conclusion with a call-to-action

3. **Client Integration:**
   - Analyze the client's products/services from the website content
   - Naturally weave in mentions of the client's offerings where relevant
   - Do NOT make it sound like a sales pitch
   - Keep the focus on providing value to the reader

4. **Format:**
   - Use Markdown formatting
   - Start with the meta description in a blockquote
   - Follow with the H1 title
   - Use proper heading hierarchy

**Output Structure:**
\`\`\`
> Meta Description: [Your 150-160 character meta description]

# [H1 Title]

[Introduction paragraph]

## [H2 Subheading]

[Content...]

## [H2 Subheading]

[Content...]

### [H3 Subheading if needed]

[Content...]

## Conclusion

[Conclusion with CTA]
\`\`\`

Write the blog now.`;
};

export const generateSEOBlog = async (input: BlogInput): Promise<string> => {
    // Fetch website content
    const websiteContent = await fetchWebsiteContent(input.websiteUrl);

    const prompt = constructPrompt(input, websiteContent);

    try {
        const localAi = getAiClient();
        const response = await localAi.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`The AI model failed to respond: ${error.message}`);
        }
        throw new Error("The AI model failed to respond. Please try again later.");
    }
};
