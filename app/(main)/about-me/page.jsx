"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center px-8 py-24">
      {/* HEADER SECTION */}
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-extrabold mb-8 tracking-tight border-b border-black inline-block pb-3">
          About <span className="text-gray-700">PrepForVISA</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mt-6 max-w-3xl mx-auto">
          PrepForVISA is a web platform created to transform how students prepare for their F1 Visa interviews. My goal was to build something that feels real, a digital space where you can simulate interviews, receive feedback, and gain complete confidence before your actual appointment. Every decision in this project was driven by simplicity, purpose, and precision.
        </p>
      </div>

      {/* IMAGE + BIO SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-24 mt-24 max-w-6xl">
        {/* IMAGE PLACEHOLDER */}
        <div className="relative w-80 h-80 border border-gray-300 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/pallav-placeholder.jpg" // replace with your actual image
            alt="Pallav Khanal"
            fill
            className="object-cover grayscale hover:grayscale-0 transition duration-500"
          />
        </div>

        {/* BIO */}
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-6 border-b border-gray-300 pb-3">
            I'm <span className="text-gray-700">Pallav Khanal</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            I am a Computer Science student at the University of Texas at Arlington who believes that technology can change how we prepare, think, and succeed. I built PrepForVISA after watching many students feel nervous and uncertain before their visa interviews. This project is my way of helping students face that challenge with confidence.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            My focus is on creating digital products that combine intelligence with elegance. I enjoy building tools that are both useful and beautiful. My background includes web development, artificial intelligence, and design. PrepForVISA is a reflection of my mindset to build with quality, empathy, and purpose.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Outside of coding, I am passionate about fitness, quantum computing, and creative coding. Everything I do revolves around one simple belief: to use technology to help people grow, think clearly, and achieve what they dream of.
          </p>
        </div>
      </div>

      {/* CORE VALUES SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-32 max-w-6xl w-full">
        <Card className="bg-white border border-gray-200 text-gray-700 hover:shadow-2xl hover:border-black transition-all duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-black">Realism</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Every question and tone inside PrepForVISA is inspired by real interviews. The goal is to make your preparation feel as close to the real experience as possible.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 text-gray-700 hover:shadow-2xl hover:border-black transition-all duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-black">Innovation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              PrepForVISA was designed as a system that learns, adapts, and feels human. Every interaction is crafted to help users improve through an intelligent and intuitive experience.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 text-gray-700 hover:shadow-2xl hover:border-black transition-all duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-black">Empowerment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              This platform is not just about practice. It is about empowerment, helping students feel calm, ready, and proud of their journey when they step into the consulate.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA SECTION */}
      <div className="text-center mt-32">
        <h3 className="text-3xl font-semibold mb-6">
          Ready to prepare with clarity and confidence
        </h3>
        <Button className="bg-black text-white hover:bg-gray-800 transition px-8 py-6 text-lg font-semibold rounded-full">
          Start Preparing Now
        </Button>
      </div>

      <footer className="mt-32 text-gray-500 text-sm border-t border-gray-200 pt-6 text-center w-full">
        © {new Date().getFullYear()} PrepForVISA • Designed and built by Pallav Khanal
      </footer>
    </div>
  );
}
