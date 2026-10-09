import { MailOpen, ShieldCheck, MessageCircle, Route } from "lucide-react";

export default function TransmissionPipeline() {
  return (
    <section className="w-full bg-surface-container-high/25 py-10 md:py-12">
      <div className="w-full container px-4 lg:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="font-display text-[11px] leading-4 tracking-[0.12em] font-semibold uppercase tracking-widest text-primary">
              WHAT HAPPENS NEXT
            </span>
            <h2 className="font-display text-[32px] md:text-[36px] leading-[40px] md:leading-[44px] tracking-[-0.02em] font-bold text-on-surface">
              What Happens After You Reach Out?
            </h2>
            <p className="font-sans text-[15px] leading-6 text-secondary pt-1">
              No black box, no guessing what happens after you hit send. Here's exactly what to expect, step by step.
            </p>
          </div>
          <span className="font-display text-[12px] leading-4 tracking-[0.04em] font-medium text-secondary uppercase bg-surface-container-lowest/75 px-4 py-1.5 rounded-full border border-surface-container-highest/50 shadow-sm shrink-0">
            4 simple steps
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Step 1 */}
          <div className="relative overflow-hidden bg-surface-container-lowest/75 p-5 rounded-xl shadow-sm border border-surface-container-highest/50 hover:bg-surface-container-lowest hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 ease-out group cursor-default">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-xl animate-pulse" style={{ animationDelay: '0ms' }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative flex-shrink-0 w-10 h-10">
                  <div className="absolute inset-0 rounded-lg border border-primary/40 opacity-50 animate-pulse group-hover:opacity-0 transition-opacity duration-300" style={{ animationDelay: '0ms' }}></div>
                  <div className="relative w-full h-full bg-surface-container/90 text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-sm group-hover:shadow-md">
                    <MailOpen className="w-5 h-5 group-hover:animate-pulse" />
                  </div>
                </div>
                <h3 className="font-display text-[17px] leading-6 font-bold text-on-surface flex items-center gap-1.5 group-hover:text-primary transition-colors duration-300">
                  <span className="text-primary/90 font-mono text-[13px] font-semibold animate-pulse group-hover:animate-none group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" style={{ animationDelay: '0ms' }}>01.</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Your Message Gets a Real Read</span>
                </h3>
              </div>
              <p className="font-sans text-[14px] leading-5 text-secondary/90 group-hover:text-secondary transition-colors duration-300 pl-[3.25rem]">
                I personally read every inquiry — nothing goes through a filter or a team first.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative overflow-hidden bg-surface-container-lowest/75 p-5 rounded-xl shadow-sm border border-surface-container-highest/50 hover:bg-surface-container-lowest hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 ease-out group cursor-default">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-xl animate-pulse" style={{ animationDelay: '400ms' }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative flex-shrink-0 w-10 h-10">
                  <div className="absolute inset-0 rounded-lg border border-primary/40 opacity-50 animate-pulse group-hover:opacity-0 transition-opacity duration-300" style={{ animationDelay: '400ms' }}></div>
                  <div className="relative w-full h-full bg-surface-container/90 text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out shadow-sm group-hover:shadow-md">
                    <ShieldCheck className="w-5 h-5 group-hover:animate-pulse" />
                  </div>
                </div>
                <h3 className="font-display text-[17px] leading-6 font-bold text-on-surface flex items-center gap-1.5 group-hover:text-primary transition-colors duration-300">
                  <span className="text-primary/90 font-mono text-[13px] font-semibold animate-pulse group-hover:animate-none group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" style={{ animationDelay: '400ms' }}>02.</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">NDA, If You Want One</span>
                </h3>
              </div>
              <p className="font-sans text-[14px] leading-5 text-secondary/90 group-hover:text-secondary transition-colors duration-300 pl-[3.25rem]">
                If you'd rather sign an NDA before sharing project details, we take care of that first.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative overflow-hidden bg-surface-container-lowest/75 p-5 rounded-xl shadow-sm border border-surface-container-highest/50 hover:bg-surface-container-lowest hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 ease-out group cursor-default">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-xl animate-pulse" style={{ animationDelay: '800ms' }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative flex-shrink-0 w-10 h-10">
                  <div className="absolute inset-0 rounded-lg border border-primary/40 opacity-50 animate-pulse group-hover:opacity-0 transition-opacity duration-300" style={{ animationDelay: '800ms' }}></div>
                  <div className="relative w-full h-full bg-surface-container/90 text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out shadow-sm group-hover:shadow-md">
                    <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                  </div>
                </div>
                <h3 className="font-display text-[17px] leading-6 font-bold text-on-surface flex items-center gap-1.5 group-hover:text-primary transition-colors duration-300">
                  <span className="text-primary/90 font-mono text-[13px] font-semibold animate-pulse group-hover:animate-none group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" style={{ animationDelay: '800ms' }}>03.</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">A Real Conversation</span>
                </h3>
              </div>
              <p className="font-sans text-[14px] leading-5 text-secondary/90 group-hover:text-secondary transition-colors duration-300 pl-[3.25rem]">
                We talk through what you need, what's possible, and how it could work — no pressure, no commitment.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative overflow-hidden bg-surface-container-lowest/75 p-5 rounded-xl shadow-sm border border-surface-container-highest/50 hover:bg-surface-container-lowest hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 ease-out group cursor-default">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-xl animate-pulse" style={{ animationDelay: '1200ms' }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative flex-shrink-0 w-10 h-10">
                  <div className="absolute inset-0 rounded-lg border border-primary/40 opacity-50 animate-pulse group-hover:opacity-0 transition-opacity duration-300" style={{ animationDelay: '1200ms' }}></div>
                  <div className="relative w-full h-full bg-surface-container/90 text-secondary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-out shadow-sm group-hover:shadow-md">
                    <Route className="w-5 h-5 group-hover:animate-pulse" />
                  </div>
                </div>
                <h3 className="font-display text-[17px] leading-6 font-bold text-on-surface flex items-center gap-1.5 group-hover:text-primary transition-colors duration-300">
                  <span className="text-primary/90 font-mono text-[13px] font-semibold animate-pulse group-hover:animate-none group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" style={{ animationDelay: '1200ms' }}>04.</span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">A Clear Plan</span>
                </h3>
              </div>
              <p className="font-sans text-[14px] leading-5 text-secondary/90 group-hover:text-secondary transition-colors duration-300 pl-[3.25rem]">
                If it's a good fit, you get a straightforward plan: what's involved, rough timing, and what happens next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
