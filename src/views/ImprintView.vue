<script setup>
import SectionHeading from "@/components/SectionHeading.vue";
import site from "@/data/site.json";
import { fadeUp, fadeUpStaggered } from "@/motion/presets";
</script>

<template>
  <section
    v-motion="fadeUp"
    class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
  >
    <SectionHeading
      eyebrow="Legal"
      title="Impressum"
      description="Angaben gemäß § 5 TMG."
    />
  </section>

  <section
    class="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-12 lg:px-8"
  >
    <div class="lg:col-span-5 space-y-6">
      <div
        v-motion="fadeUpStaggered(0, 100)"
        class="rounded-xl border border-ink-200 bg-white p-6 shadow-soft transition-colors dark:border-ink-800 dark:bg-ink-900"
      >
        <span
          class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
          >Anbieter</span
        >
        <p class="mt-3 font-display text-lg font-semibold">HULKs e. V.</p>
        <p class="text-sm text-ink-600 dark:text-ink-300">
          Am Schwarzenberg-Campus 3<br />
          21073 Hamburg
        </p>
      </div>

      <div
        v-motion="fadeUpStaggered(1, 100)"
        class="rounded-xl border border-ink-200 bg-white p-6 shadow-soft transition-colors dark:border-ink-800 dark:bg-ink-900"
      >
        <span
          class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
          >Vertreten durch</span
        >
        <ul class="mt-3 space-y-1 text-sm text-ink-700 dark:text-ink-200">
          <li v-for="person in site.imprint.representatives" :key="person.name">
            <span class="font-medium">{{ person.name }}</span>
            <span class="text-ink-500 dark:text-ink-400">
              · {{ person.role }}</span
            >
          </li>
        </ul>
      </div>

      <div
        v-motion="fadeUpStaggered(2, 100)"
        class="rounded-xl border border-ink-200 bg-white p-6 shadow-soft transition-colors dark:border-ink-800 dark:bg-ink-900"
      >
        <span
          class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
          >Kontakt</span
        >
        <dl class="mt-3 space-y-2 text-sm">
          <div class="flex gap-2">
            <dt class="w-20 shrink-0 text-ink-500 dark:text-ink-400">
              Telefon
            </dt>
            <dd>
              <a
                class="text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
                href="tel:+4940428784723"
                >+49 40 / 42878-4723</a
              >
            </dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-20 shrink-0 text-ink-500 dark:text-ink-400">E-Mail</dt>
            <dd>
              <a
                class="text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
                :href="`mailto:${site.contact.email}`"
              >
                {{ site.contact.email }}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div
        v-motion="fadeUpStaggered(3, 100)"
        class="rounded-xl border border-ink-200 bg-white p-6 shadow-soft transition-colors dark:border-ink-800 dark:bg-ink-900"
      >
        <span
          class="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300 before:block before:h-px before:w-8 before:bg-brand-500 before:content-['']"
          >Registereintrag</span
        >
        <p class="mt-3 text-sm text-ink-700 dark:text-ink-200">
          Eintragung im Vereinsregister.
        </p>
        <dl class="mt-3 space-y-2 text-sm">
          <div class="flex gap-2">
            <dt class="w-32 shrink-0 text-ink-500 dark:text-ink-400">
              Registergericht
            </dt>
            <dd>Amtsgericht Hamburg</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-32 shrink-0 text-ink-500 dark:text-ink-400">
              Registernummer
            </dt>
            <dd>21852</dd>
          </div>
        </dl>
      </div>
    </div>

    <div v-motion="fadeUp" class="lg:col-span-7">
      <div
        class="h-full rounded-xl border border-ink-200 bg-white p-5 shadow-soft transition-colors sm:p-6 lg:p-8 dark:border-ink-800 dark:bg-ink-900"
      >
        <h3 class="font-display text-xl font-semibold">
          Haftungsausschluss (Disclaimer)
        </h3>

        <div
          class="mt-6 space-y-6 text-sm leading-relaxed text-ink-700 dark:text-ink-300"
        >
          <div>
            <h4
              class="font-display text-base font-semibold text-ink-900 dark:text-white"
            >
              Haftung für Inhalte
            </h4>
            <p class="mt-2">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
              Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </div>

          <div>
            <h4
              class="font-display text-base font-semibold text-ink-900 dark:text-white"
            >
              Haftung für Links
            </h4>
            <p class="mt-2">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
              der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </div>

          <div>
            <h4
              class="font-display text-base font-semibold text-ink-900 dark:text-white"
            >
              Urheberrecht
            </h4>
            <p class="mt-2">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
              Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
