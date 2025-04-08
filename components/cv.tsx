"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CV() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const downloadCV = () => {
    const { language } = useLanguage();
    const pdfUrl = `/cv/cv_${language === 'ru' ? 'ru' : 'en'}.pdf`;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `CV_${t('cv.name').replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section id="cv" className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("cv.title")}</h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold">{t("cv.name")}</h3>
                  <p className="text-muted-foreground">{t("cv.age")}</p>
                  <p className="text-muted-foreground">{t("cv.location")}</p>
                  <p className="text-muted-foreground">{t("cv.profession")}</p>
                </div>
                <Button onClick={downloadCV} className="mt-4 md:mt-0">
                  <Download className="h-4 w-4 mr-2" />
                  {t("cv.download")}
                </Button>
              </div>

              {/* CV Content */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold border-b pb-2 mb-3">{t("cv.education.title")}</h4>
                  <div className="space-y-4">
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium">{t("cv.education.courses")}</p>
                      <p className="text-sm text-muted-foreground">{t("cv.education.courses.period")}</p>
                      <p className="text-sm mt-2">{t("cv.education.courses.description")}</p>
                    </div>
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium">{t("cv.education.smart_contracts")}</p>
                      <p className="text-sm text-muted-foreground">{t("cv.education.smart_contracts.period")}</p>
                      <p className="text-sm mt-2">{t("cv.education.smart_contracts.description")}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold border-b pb-2 mb-3">{t("cv.hackathons.title")}</h4>
                  <div className="space-y-4">
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium">{t("cv.hackathons.constellation.title")}</p>
                      <p className="text-sm mt-2">{t("cv.hackathons.constellation.description")}</p>
                    </div>
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium">{t("cv.hackathons.blockmagic.title")}</p>
                      <p className="text-sm mt-2">{t("cv.hackathons.blockmagic.description")}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold border-b pb-2 mb-3">{t("cv.skills.title")}</h4>
                  <div className="space-y-4">
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium">{t("cv.skills.programming.title")}</p>
                      <p className="text-sm mt-2">{t("cv.skills.programming.primary")}</p>
                      <p className="text-sm mt-2">{t("cv.skills.programming.secondary")}</p>
                    </div>
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium">{t("cv.skills.technical.title")}</p>
                      <p className="text-sm mt-2">{t("cv.skills.technical.items")}</p>
                    </div>
                    <div className="pl-4 border-l-2 border-primary/20">
                      <p className="font-medium">{t("cv.skills.soft.title")}</p>
                      <p className="text-sm mt-2">{t("cv.skills.soft.items")}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold border-b pb-2 mb-3">{t("cv.languages.title")}</h4>
                  <div className="space-y-2">
                    <p className="text-sm">{t("cv.languages.russian")}</p>
                    <p className="text-sm">{t("cv.languages.estonian")}</p>
                    <p className="text-sm">{t("cv.languages.english")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}


