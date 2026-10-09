'use client';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

export default function InsightFaq({ faqs }) {
  let parsedFaqs = faqs;
  if (typeof faqs === 'string') {
    try { parsedFaqs = JSON.parse(faqs); } catch (e) { parsedFaqs = []; }
  }
  if (!Array.isArray(parsedFaqs) || parsedFaqs.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-surface-container-highest/50">
      <h3 className="text-2xl font-display font-extrabold text-on-surface mb-8 tracking-tight">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {parsedFaqs.map((faq, idx) => (
          <Disclosure as="div" defaultOpen={idx === 0} key={idx} className="bg-surface-container/30 backdrop-blur-md border border-surface-container-highest rounded-2xl transition-all shadow-sm">
            {({ open }) => (
              <>
                <DisclosureButton className="flex w-full items-center justify-between font-bold text-on-surface p-5 cursor-pointer rounded-2xl hover:bg-surface-container/50 focus:outline-none focus-visible:ring focus-visible:ring-primary/50 text-left">
                  <span>{faq.question}</span>
                  <span className={`${open ? 'rotate-180 transform' : ''} transition-transform duration-200 shrink-0 ml-4`}>
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </DisclosureButton>
                <DisclosurePanel className="text-secondary px-5 pb-5 leading-relaxed prose prose-lg max-w-none prose-a:text-primary hover:prose-a:opacity-80">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
