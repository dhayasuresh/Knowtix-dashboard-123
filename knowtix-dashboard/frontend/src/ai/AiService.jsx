// ai/AIService.js
import OpenAI from "openai"; // npm install openai
import { GoogleGenerativeAI } from "@google/generative-ai"; // Gemini
import Anthropic from "@anthropic-ai/sdk"; // Claude
// For LLaMA, Mistral, HuggingFace APIs – use fetch

class AIService {
  constructor() {
    this.plugins = {};
    this.activeModel = "gpt-4";
  }

  // Register AI plugins dynamically
  registerPlugin(name, handler) {
    this.plugins[name] = handler;
  }

  setActiveModel(name) {
    if (!this.plugins[name]) throw new Error(`${name} not registered!`);
    this.activeModel = name;
  }

  getActiveModel() {
    return this.activeModel;
  }

  async generateContent(type, topic, options = {}) {
    const plugin = this.plugins[this.activeModel];
    if (!plugin) throw new Error("No AI plugin active!");

    switch (type) {
      case "quiz":
        return plugin.generateQuiz(topic, options);
      case "study":
        return plugin.generateStudyMaterial(topic, options);
      case "questions":
        return plugin.generateQuestions(topic, options);
      case "notes":
        return plugin.generateNotes(topic, options);
      default:
        throw new Error("Unsupported content type");
    }
  }

  async analyzeDocument(file) {
    // Simple text extraction demo
    const text = await this.extractText(file);

    // Send to AI for summarization / quiz gen
    return this.generateContent("quiz", text.slice(0, 1000));
  }

  async extractText(file) {
    const ext = file.name.split(".").pop().toLowerCase();
    let text = "";

    if (ext === "pdf") {
      const pdfjsLib = await import("pdfjs-dist");
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      const page = await pdf.getPage(1);
      const content = await page.getTextContent();
      text = content.items.map(i => i.str).join(" ");
    } else if (ext === "txt") {
      text = await file.text();
    } else if (ext === "docx") {
      // Use mammoth.js for DOCX
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
      text = result.value;
    }

    return text;
  }
}

/* -----------------------
   Example Plugin: GPT-4
------------------------ */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GPTPlugin = {
  async generateQuiz(topic) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Generate a quiz about ${topic} with 3 MCQs and answers.` }]
    });
    return response.choices[0].message.content;
  },
  async generateStudyMaterial(topic) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Create study material with key points, examples, and summary for ${topic}.` }]
    });
    return response.choices[0].message.content;
  },
  async generateQuestions(topic) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Generate 5 important descriptive questions on ${topic}.` }]
    });
    return response.choices[0].message.content;
  },
  async generateNotes(topic) {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: `Generate concise study notes with formulas and tips for ${topic}.` }]
    });
    return response.choices[0].message.content;
  }
};

/* -----------------------
   Example Plugin: Claude
------------------------ */
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

const ClaudePlugin = {
  async generateQuiz(topic) {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 500,
      messages: [{ role: "user", content: `Generate 3 quiz questions with answers for ${topic}.` }]
    });
    return response.content[0].text;
  },
  // ...same pattern for study, notes, questions
};

/* -----------------------
   Setup AI Service
------------------------ */
const aiService = new AIService();
aiService.registerPlugin("gpt-4", GPTPlugin);
aiService.registerPlugin("claude", ClaudePlugin);
// Later: gemini, mistral, llama etc.

export default aiService;
