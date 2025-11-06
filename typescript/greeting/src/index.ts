import express from 'express';
import { ToolsService, tool, ParameterType } from '@optimizely-opal/opal-tools-sdk';

// Create Express app
const app = express();
app.use(express.json());

// Create Tools Service
const toolsService = new ToolsService(app);

// Interfaces for tool parameters
interface GreetingParameters {
  name: string;
  language?: string;
}

interface DateParameters {
  format?: string;
}

interface RandomGeneratorParameters {
  type: string;
  min?: number;
  max?: number;
  length?: number;
}

interface StringUtilityParameters {
  text: string;
  operation: string;
}

interface MathCalculatorParameters {
  operation: string;
  a: number;
  b?: number;
}

interface UnitConverterParameters {
  value: number;
  from: string;
  to: string;
  category: string;
}

interface TextAnalyzerParameters {
  text: string;
}

/**
 * Greeting Tool: Greets a person in a random language
 */
// Apply tool decorator after function definition
async function greeting(parameters: GreetingParameters) {
  const { name, language } = parameters;
  
  // If language not specified, choose randomly
  const selectedLanguage = language || 
    ['english', 'spanish', 'french'][Math.floor(Math.random() * 3)];
  
  // Generate greeting based on language
  let greeting: string;
  if (selectedLanguage.toLowerCase() === 'spanish') {
    greeting = `¡Hola, ${name}! ¿Cómo estás?`;
  } else if (selectedLanguage.toLowerCase() === 'french') {
    greeting = `Bonjour, ${name}! Comment ça va?`;
  } else { // Default to English
    greeting = `Hello, ${name}! How are you?`;
  }
  
  return {
    greeting,
    language: selectedLanguage
  };
}

/**
 * Today's Date Tool: Returns today's date in the specified format
 */
// Apply tool decorator after function definition
async function todaysDate(parameters: DateParameters) {
  const format = parameters.format || '%Y-%m-%d';
  
  // Get today's date
  const today = new Date();
  
  // Format the date (simplified implementation)
  let formattedDate: string;
  if (format === '%Y-%m-%d') {
    formattedDate = today.toISOString().split('T')[0];
  } else if (format === '%B %d, %Y') {
    formattedDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } else if (format === '%d/%m/%Y') {
    formattedDate = today.toLocaleDateString('en-GB');
  } else {
    // Default to ISO format
    formattedDate = today.toISOString().split('T')[0];
  }
  
  return {
    date: formattedDate,
    format: format,
    timestamp: today.getTime() / 1000
  };
}

/**
 * Random Generator Tool: Generates random values (numbers, UUIDs, passwords)
 */
async function randomGenerator(parameters: RandomGeneratorParameters) {
  const { type, min = 0, max = 100, length = 12 } = parameters;
  
  switch (type.toLowerCase()) {
    case 'number':
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return {
        type: 'number',
        value: randomNum,
        range: `${min}-${max}`
      };
    
    case 'uuid':
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      return {
        type: 'uuid',
        value: uuid
      };
    
    case 'password':
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let password = '';
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return {
        type: 'password',
        value: password,
        length: length
      };
    
    default:
      throw new Error(`Unsupported type: ${type}. Use 'number', 'uuid', or 'password'`);
  }
}

/**
 * String Utility Tool: Performs various string operations
 */
async function stringUtility(parameters: StringUtilityParameters) {
  const { text, operation } = parameters;
  
  let result: string;
  
  switch (operation.toLowerCase()) {
    case 'uppercase':
      result = text.toUpperCase();
      break;
    
    case 'lowercase':
      result = text.toLowerCase();
      break;
    
    case 'reverse':
      result = text.split('').reverse().join('');
      break;
    
    case 'slug':
      result = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      break;
    
    case 'capitalize':
      result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      break;
    
    case 'title':
      result = text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      break;
    
    default:
      throw new Error(`Unsupported operation: ${operation}. Use 'uppercase', 'lowercase', 'reverse', 'slug', 'capitalize', or 'title'`);
  }
  
  return {
    original: text,
    operation: operation,
    result: result
  };
}

/**
 * Math Calculator Tool: Performs mathematical operations
 */
async function mathCalculator(parameters: MathCalculatorParameters) {
  const { operation, a, b = 0 } = parameters;
  
  let result: number;
  
  switch (operation.toLowerCase()) {
    case 'add':
      result = a + b;
      break;
    
    case 'subtract':
      result = a - b;
      break;
    
    case 'multiply':
      result = a * b;
      break;
    
    case 'divide':
      if (b === 0) {
        throw new Error('Cannot divide by zero');
      }
      result = a / b;
      break;
    
    case 'power':
      result = Math.pow(a, b);
      break;
    
    case 'sqrt':
      if (a < 0) {
        throw new Error('Cannot calculate square root of negative number');
      }
      result = Math.sqrt(a);
      break;
    
    case 'percentage':
      result = (a / 100) * b;
      break;
    
    case 'abs':
      result = Math.abs(a);
      break;
    
    case 'round':
      result = Math.round(a);
      break;
    
    case 'floor':
      result = Math.floor(a);
      break;
    
    case 'ceil':
      result = Math.ceil(a);
      break;
    
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
  
  return {
    operation: operation,
    input: b !== 0 || ['add', 'subtract', 'multiply', 'divide', 'power', 'percentage'].includes(operation.toLowerCase()) 
      ? { a, b } 
      : { a },
    result: result
  };
}

/**
 * Unit Converter Tool: Converts between different units
 */
async function unitConverter(parameters: UnitConverterParameters) {
  const { value, from, to, category } = parameters;
  
  let result: number;
  
  switch (category.toLowerCase()) {
    case 'temperature':
      result = convertTemperature(value, from, to);
      break;
    
    case 'distance':
      result = convertDistance(value, from, to);
      break;
    
    case 'weight':
      result = convertWeight(value, from, to);
      break;
    
    default:
      throw new Error(`Unsupported category: ${category}. Use 'temperature', 'distance', or 'weight'`);
  }
  
  return {
    value: value,
    from: from,
    to: to,
    category: category,
    result: result
  };
}

function convertTemperature(value: number, from: string, to: string): number {
  const conversions: { [key: string]: (v: number) => number } = {
    'celsius-fahrenheit': (v) => (v * 9/5) + 32,
    'celsius-kelvin': (v) => v + 273.15,
    'fahrenheit-celsius': (v) => (v - 32) * 5/9,
    'fahrenheit-kelvin': (v) => ((v - 32) * 5/9) + 273.15,
    'kelvin-celsius': (v) => v - 273.15,
    'kelvin-fahrenheit': (v) => ((v - 273.15) * 9/5) + 32
  };
  
  const key = `${from.toLowerCase()}-${to.toLowerCase()}`;
  if (conversions[key]) {
    return Math.round(conversions[key](value) * 100) / 100;
  }
  throw new Error(`Unsupported temperature conversion: ${from} to ${to}`);
}

function convertDistance(value: number, from: string, to: string): number {
  const toMeters: { [key: string]: number } = {
    'meter': 1,
    'kilometer': 1000,
    'mile': 1609.34,
    'foot': 0.3048,
    'inch': 0.0254,
    'yard': 0.9144
  };
  
  const fromRate = toMeters[from.toLowerCase()];
  const toRate = toMeters[to.toLowerCase()];
  
  if (!fromRate || !toRate) {
    throw new Error(`Unsupported distance units: ${from} or ${to}`);
  }
  
  return Math.round((value * fromRate / toRate) * 100) / 100;
}

function convertWeight(value: number, from: string, to: string): number {
  const toGrams: { [key: string]: number } = {
    'gram': 1,
    'kilogram': 1000,
    'pound': 453.592,
    'ounce': 28.3495,
    'ton': 1000000
  };
  
  const fromRate = toGrams[from.toLowerCase()];
  const toRate = toGrams[to.toLowerCase()];
  
  if (!fromRate || !toRate) {
    throw new Error(`Unsupported weight units: ${from} or ${to}`);
  }
  
  return Math.round((value * fromRate / toRate) * 100) / 100;
}

/**
 * Text Analyzer Tool: Analyzes text and provides statistics
 */
async function textAnalyzer(parameters: TextAnalyzerParameters) {
  const { text } = parameters;
  
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  const wordFrequency: { [key: string]: number } = {};
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    if (cleanWord) {
      wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
    }
  });
  
  const mostCommon = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));
  
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / (words.length || 1);
  const avgSentenceLength = words.length / (sentences.length || 1);
  
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: words.length,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    averageWordLength: Math.round(avgWordLength * 100) / 100,
    averageSentenceLength: Math.round(avgSentenceLength * 100) / 100,
    mostCommonWords: mostCommon,
    readingTimeMinutes: Math.ceil(words.length / 200) // Assuming 200 words per minute
  };
}

// Register the tools using decorators with explicit parameter definitions
tool({
  name: 'greeting',
  description: 'Greets a person in a random language (English, Spanish, or French)',
  parameters: [
    {
      name: 'name',
      type: ParameterType.String,
      description: 'Name of the person to greet',
      required: true
    },
    {
      name: 'language',
      type: ParameterType.String,
      description: 'Language for greeting (defaults to random)',
      required: false
    }
  ]
})(greeting);

tool({
  name: 'todays-date',
  description: 'Returns today\'s date in the specified format',
  parameters: [
    {
      name: 'format',
      type: ParameterType.String,
      description: 'Date format (defaults to ISO format)',
      required: false
    }
  ]
})(todaysDate);

tool({
  name: 'random-generator',
  description: 'Generates random values (number, UUID, or password)',
  parameters: [
    {
      name: 'type',
      type: ParameterType.String,
      description: 'Type of random value to generate: "number", "uuid", or "password"',
      required: true
    },
    {
      name: 'min',
      type: ParameterType.Number,
      description: 'Minimum value for random number (default: 0)',
      required: false
    },
    {
      name: 'max',
      type: ParameterType.Number,
      description: 'Maximum value for random number (default: 100)',
      required: false
    },
    {
      name: 'length',
      type: ParameterType.Number,
      description: 'Length of generated password (default: 12)',
      required: false
    }
  ]
})(randomGenerator);

tool({
  name: 'string-utility',
  description: 'Performs string operations: uppercase, lowercase, reverse, slug, capitalize, or title case',
  parameters: [
    {
      name: 'text',
      type: ParameterType.String,
      description: 'The text to transform',
      required: true
    },
    {
      name: 'operation',
      type: ParameterType.String,
      description: 'Operation to perform: "uppercase", "lowercase", "reverse", "slug", "capitalize", or "title"',
      required: true
    }
  ]
})(stringUtility);

tool({
  name: 'math-calculator',
  description: 'Performs mathematical operations: add, subtract, multiply, divide, power, sqrt, percentage, abs, round, floor, ceil',
  parameters: [
    {
      name: 'operation',
      type: ParameterType.String,
      description: 'Math operation to perform',
      required: true
    },
    {
      name: 'a',
      type: ParameterType.Number,
      description: 'First number',
      required: true
    },
    {
      name: 'b',
      type: ParameterType.Number,
      description: 'Second number (required for binary operations)',
      required: false
    }
  ]
})(mathCalculator);

tool({
  name: 'unit-converter',
  description: 'Converts between different units (temperature, distance, weight)',
  parameters: [
    {
      name: 'value',
      type: ParameterType.Number,
      description: 'The value to convert',
      required: true
    },
    {
      name: 'from',
      type: ParameterType.String,
      description: 'Source unit',
      required: true
    },
    {
      name: 'to',
      type: ParameterType.String,
      description: 'Target unit',
      required: true
    },
    {
      name: 'category',
      type: ParameterType.String,
      description: 'Category: "temperature", "distance", or "weight"',
      required: true
    }
  ]
})(unitConverter);

tool({
  name: 'text-analyzer',
  description: 'Analyzes text and provides statistics (word count, character count, reading time, etc.)',
  parameters: [
    {
      name: 'text',
      type: ParameterType.String,
      description: 'The text to analyze',
      required: true
    }
  ]
})(textAnalyzer);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
});
