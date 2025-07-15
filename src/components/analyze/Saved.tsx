
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {  TabsContent } from "@/components/ui/tabs";
import { AlertTriangle,  FolderOpen } from "lucide-react";
import { useGetAnalysis,  } from "@/hooks/use-model";
import { summaryTypes } from "@/types/types";

function Saved() {
    const { data: UserSummary } = useGetAnalysis()
  return (
    <div>
          <TabsContent value="saved">
              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
                  <CardHeader>
                      <CardTitle className="flex font-montserrat items-center gap-2 text-gray-800 dark:text-gray-100">
                          <FolderOpen className="w-5 h-5 text-blue-600" />
                          My Saved Analyses
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 font-sans">
                          View and manage your previously saved analyses
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      {UserSummary?.length === 0 ? (
                          <div className="text-center py-8">
                              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500 dark:text-gray-400 font-sans">No saved analyses yet</p>
                              <p className="text-sm text-gray-400 dark:text-gray-500 font-sans">Your saved analyses will appear here</p>
                          </div>
                      ) : (
                          <div>
                              <section>
                                  {UserSummary?.data?.map((summary: summaryTypes) => (
                                      <div
                                          key={summary.id}
                                          className="space-y-4 mb-6 relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                                      >
                                          <p className="text-sm text-gray-700 dark:text-gray-200 text-justify font-sans">{summary?.summary}</p>

                                          {summary?.flags.length > 0 ? (
                                              summary?.flags.map((flag, index) => (
                                                  <div
                                                      key={index}
                                                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600"
                                                  >
                                                      <div className="flex items-start gap-3">
                                                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                                          <div className="flex-1 space-y-2">
                                                              <div className="flex items-center gap-2">
                                                                  <span className="text-sm text-gray-800 dark:text-gray-100 font-sans">{flag}</span>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              ))
                                          ) : (
                                              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 font-sans">
                                                  No concerning phrases detected
                                              </p>
                                          )}
                                      </div>
                                  ))}
                              </section>
                          </div>
                      )}
                  </CardContent>
              </Card>
          </TabsContent>
    </div>
  )
}

export default Saved