"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, CheckCircle2 } from "lucide-react";

export default function DonateUsPage() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      {/* HEADER */}
      <header className="border-b border-black">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/Logo.png" alt="Logo" width={42} height={42} />
            <span className="text-xl font-semibold tracking-tight">VISAPrep</span>
          </div>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
            asChild
          >
            <a href="/">Back Home</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Support the Mission.
        </h1>
        <p className="mt-4 text-lg text-black/70 max-w-xl">
          Your support powers real-time visa interview simulations and keeps access
          fair for students worldwide.
        </p>
      </section>

      <Separator />

      {/* PAYMENT + QR SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* CARD / BANK CHECKOUT (Future Stripe Ready) */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle>Card / Bank Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Amount (USD)</Label>
              <Input type="number" placeholder="25" className="border-black" />
            </div>

            <div className="space-y-2">
              <Label>Email for Receipt (optional)</Label>
              <Input type="email" placeholder="you@example.com" className="border-black" />
            </div>

            <Button className="w-full bg-black text-white hover:bg-black/80">
              Continue to Secure Checkout
            </Button>
          </CardContent>
        </Card>

        {/* QR DONATION BLOCKS */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle>Scan to Donate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">

            {/* eSewa */}
            <div>
              <div className="text-sm mb-2 font-medium">eSewa (Nepal)</div>
              <div className="relative w-full aspect-square border border-black overflow-hidden rounded-lg">
                <Image src="/qr-esewa.png" alt="eSewa QR" fill className="object-contain p-4" />
              </div>
            </div>

            {/* Zelle */}
            <div>
              <div className="text-sm mb-2 font-medium">Zelle (USA Bank Accounts)</div>
              <div className="relative w-full aspect-square border border-black overflow-hidden rounded-lg">
                <Image src="/qr-zelle.png" alt="Zelle QR" fill className="object-contain p-4" />
              </div>
            </div>

            {/* Global IME */}
            <div>
              <div className="text-sm mb-2 font-medium">Global IME Bank (Direct Transfer)</div>
              <div className="relative w-full aspect-square border border-black overflow-hidden rounded-lg">
                <Image src="/qr-globalime.png" alt="Global IME Bank QR" fill className="object-contain p-4" />
              </div>

              <Button
                variant="outline"
                className="mt-3 border-black w-full flex items-center justify-center gap-2"
                onClick={() => copy("GLOBAL_IME_BANK_ACCOUNT_NUMBER_HERE")}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4" /> Copy Account Number
                  </>
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* CONTACT */}
      <footer className="max-w-5xl mx-auto px-6 py-12 text-center text-sm text-black/70">
        For any questions, call <span className="font-semibold">(945)-371-4696</span> or email{" "}
        <a href="mailto:pallav.formal@gmail.com" className="underline">
          pallav.formal@gmail.com
        </a>
        .
      </footer>
    </div>
  );
}
