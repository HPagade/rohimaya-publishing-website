/**
 * Dependency Injection Container
 * Central place to configure and manage dependencies
 * Follows: Dependency Inversion Principle
 */

import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';
import { IAudioGenerator } from '../interfaces/IAudioGenerator';
import { IImageGenerator } from '../interfaces/IImageGenerator';
import { IUserRepository, IJobRepository, IUsageRepository } from '../interfaces/IRepository';

import { OpenAITextAnalyzer } from '../providers/openai/OpenAITextAnalyzer';
import { OpenAIAudioGenerator } from '../providers/openai/OpenAIAudioGenerator';
// import { OpenAIImageGenerator } from '../providers/openai/OpenAIImageGenerator'; // To be implemented

import { UserRepository } from '../repositories/UserRepository';
// import { JobRepository } from '../repositories/JobRepository'; // To be implemented
// import { UsageRepository } from '../repositories/UsageRepository'; // To be implemented

/**
 * Service Container
 * Manages all service instances and dependencies
 */
export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  /**
   * Get container singleton instance
   */
  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  /**
   * Register all services
   */
  private registerServices(): void {
    // ======================
    // AI PROVIDERS
    // ======================

    // Text Analyzer - can switch between OpenAI, Anthropic, etc.
    this.register<ITextAnalyzer>(
      'ITextAnalyzer',
      () => new OpenAITextAnalyzer()
    );

    // Audio Generator - can switch between OpenAI TTS, ElevenLabs, etc.
    this.register<IAudioGenerator>(
      'IAudioGenerator',
      () => new OpenAIAudioGenerator()
    );

    // Image Generator - can switch between DALL-E, Midjourney, Stability, etc.
    // this.register<IImageGenerator>(
    //   'IImageGenerator',
    //   () => new OpenAIImageGenerator()
    // );

    // ======================
    // REPOSITORIES
    // ======================

    this.register<IUserRepository>(
      'IUserRepository',
      () => new UserRepository()
    );

    // this.register<IJobRepository>(
    //   'IJobRepository',
    //   () => new JobRepository()
    // );

    // this.register<IUsageRepository>(
    //   'IUsageRepository',
    //   () => new UsageRepository()
    // );
  }

  /**
   * Register a service
   */
  register<T>(name: string, factory: () => T): void {
    this.services.set(name, factory);
  }

  /**
   * Get a service by name
   */
  get<T>(name: string): T {
    const factory = this.services.get(name);

    if (!factory) {
      throw new Error(`Service not found: ${name}`);
    }

    // Return singleton instance (create if doesn't exist)
    const instanceKey = `${name}_instance`;
    if (!this.services.has(instanceKey)) {
      this.services.set(instanceKey, factory());
    }

    return this.services.get(instanceKey) as T;
  }

  /**
   * Replace a service (useful for testing or switching providers)
   */
  replace<T>(name: string, factory: () => T): void {
    this.services.delete(`${name}_instance`); // Clear cached instance
    this.register(name, factory);
  }
}

/**
 * Helper function to get services
 */
export function getService<T>(name: string): T {
  return Container.getInstance().get<T>(name);
}

/**
 * Switch AI providers based on environment variables
 */
export function configureProviders(): void {
  const container = Container.getInstance();

  // Switch text analyzer
  if (process.env.TEXT_ANALYZER === 'anthropic') {
    // container.replace<ITextAnalyzer>(
    //   'ITextAnalyzer',
    //   () => new AnthropicTextAnalyzer()
    // );
    console.log('Using Anthropic for text analysis');
  } else {
    console.log('Using OpenAI for text analysis');
  }

  // Switch audio generator
  if (process.env.AUDIO_GENERATOR === 'elevenlabs') {
    // container.replace<IAudioGenerator>(
    //   'IAudioGenerator',
    //   () => new ElevenLabsAudioGenerator()
    // );
    console.log('Using ElevenLabs for audio generation');
  } else {
    console.log('Using OpenAI TTS for audio generation');
  }

  // Switch image generator
  if (process.env.IMAGE_GENERATOR === 'stability') {
    // container.replace<IImageGenerator>(
    //   'IImageGenerator',
    //   () => new StabilityImageGenerator()
    // );
    console.log('Using Stability AI for image generation');
  } else {
    console.log('Using OpenAI DALL-E for image generation');
  }
}

/**
 * Example usage in controllers:
 *
 * import { getService } from '../config/container';
 * import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';
 *
 * class FormatterController {
 *   private analyzer: ITextAnalyzer;
 *
 *   constructor() {
 *     this.analyzer = getService<ITextAnalyzer>('ITextAnalyzer');
 *   }
 *
 *   async analyzeManuscript(text: string) {
 *     return await this.analyzer.analyzeText(text);
 *   }
 * }
 */

export default Container;
