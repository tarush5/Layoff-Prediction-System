"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Download, Calendar, Users, BarChart3, TrendingUp, Shield, Mail, Eye, Clock } from "lucide-react"

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: "employee" | "department" | "company" | "executive"
  sections: string[]
  estimatedPages: number
  frequency: string
}

interface GeneratedReport {
  id: string
  name: string
  type: string
  generatedAt: string
  status: "generating" | "ready" | "failed"
  size: string
  downloadUrl?: string
}

const reportTemplates: ReportTemplate[] = [
  {
    id: "employee-assessment",
    name: "Individual Employee Assessment",
    description: "Comprehensive risk analysis and skill recommendations for a single employee",
    type: "employee",
    sections: ["Risk Assessment", "Skill Analysis", "Career Recommendations", "Action Plan"],
    estimatedPages: 8,
    frequency: "On-demand",
  },
  {
    id: "department-overview",
    name: "Department Risk Overview",
    description: "Department-wide risk analysis and strategic recommendations",
    type: "department",
    sections: ["Department Metrics", "Risk Distribution", "Skill Gaps", "Recommendations"],
    estimatedPages: 12,
    frequency: "Monthly",
  },
  {
    id: "company-dashboard",
    name: "Company-Wide Analytics",
    description: "Complete organizational insights and strategic planning report",
    type: "company",
    sections: ["Executive Summary", "Risk Analysis", "Skill Trends", "Predictive Insights", "Action Items"],
    estimatedPages: 20,
    frequency: "Quarterly",
  },
  {
    id: "executive-summary",
    name: "Executive Summary",
    description: "High-level insights and strategic recommendations for leadership",
    type: "executive",
    sections: ["Key Metrics", "Strategic Insights", "Risk Mitigation", "Investment Recommendations"],
    estimatedPages: 6,
    frequency: "Monthly",
  },
]

const mockGeneratedReports: GeneratedReport[] = [
  {
    id: "1",
    name: "Q1 2024 Company Analytics",
    type: "Company-Wide Analytics",
    generatedAt: "2024-01-15T10:30:00Z",
    status: "ready",
    size: "2.4 MB",
    downloadUrl: "#",
  },
  {
    id: "2",
    name: "Engineering Department Overview",
    type: "Department Risk Overview",
    generatedAt: "2024-01-12T14:20:00Z",
    status: "ready",
    size: "1.8 MB",
    downloadUrl: "#",
  },
  {
    id: "3",
    name: "Sarah Johnson - Employee Assessment",
    type: "Individual Employee Assessment",
    generatedAt: "2024-01-10T09:15:00Z",
    status: "ready",
    size: "1.2 MB",
    downloadUrl: "#",
  },
]

export function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [reportTitle, setReportTitle] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(mockGeneratedReports)

  const handleTemplateSelect = (templateId: string) => {
    const template = reportTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setSelectedSections(template.sections)
      setReportTitle(template.name)
      setReportDescription(template.description)
    }
  }

  const handleSectionToggle = (section: string) => {
    setSelectedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newReport: GeneratedReport = {
      id: Date.now().toString(),
      name: reportTitle,
      type: reportTemplates.find((t) => t.id === selectedTemplate)?.name || "Custom Report",
      generatedAt: new Date().toISOString(),
      status: "ready",
      size: "1.5 MB",
      downloadUrl: "#",
    }

    setGeneratedReports((prev) => [newReport, ...prev])
    setIsGenerating(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    if (type.includes("Employee")) return <Users className="w-4 h-4" />
    if (type.includes("Department")) return <BarChart3 className="w-4 h-4" />
    if (type.includes("Company")) return <TrendingUp className="w-4 h-4" />
    if (type.includes("Executive")) return <Shield className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  const selectedTemplateData = reportTemplates.find((t) => t.id === selectedTemplate)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Configuration */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <FileText className="w-5 h-5 text-accent" />
                  <span>Report Configuration</span>
                </CardTitle>
                <CardDescription>Configure your report settings and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="template">Report Template</Label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a report template" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Enter report title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Enter report description"
                    rows={3}
                  />
                </div>

                {selectedTemplateData?.type === "department" && (
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedTemplateData?.type === "employee" && (
                  <div className="space-y-2">
                    <Label htmlFor="employee">Employee</Label>
                    <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah-johnson">Sarah Johnson - Senior Software Engineer</SelectItem>
                        <SelectItem value="mike-chen">Mike Chen - Product Manager</SelectItem>
                        <SelectItem value="lisa-wang">Lisa Wang - Data Scientist</SelectItem>
                        <SelectItem value="john-doe">John Doe - Marketing Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-3">
                  <Label>Report Sections</Label>
                  {selectedTemplateData?.sections.map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <Checkbox
                        id={section}
                        checked={selectedSections.includes(section)}
                        onCheckedChange={() => handleSectionToggle(section)}
                      />
                      <Label htmlFor={section} className="text-sm">
                        {section}
                      </Label>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handleGenerateReport}
                  disabled={!selectedTemplate || isGenerating}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Report Preview */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground">
                  <Eye className="w-5 h-5 text-accent" />
                  <span>Report Preview</span>
                </CardTitle>
                <CardDescription>Preview of your configured report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplateData ? (
                  <>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(selectedTemplateData.name)}
                        <h3 className="font-medium text-card-foreground">{reportTitle || selectedTemplateData.name}</h3>
                      </div>
                      <p className="text-sm text-muted mb-3">{reportDescription || selectedTemplateData.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted">
                        <span>~{selectedTemplateData.estimatedPages} pages</span>
                        <span>{selectedSections.length} sections</span>
                        <span>{selectedTemplateData.frequency}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-card-foreground">Included Sections:</h4>
                      <div className="space-y-1">
                        {selectedSections.map((section, index) => (
                          <div key={section} className="flex items-center space-x-2 text-sm">
                            <span className="text-muted">{index + 1}.</span>
                            <span className="text-card-foreground">{section}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        This report will include AI-powered insights, risk assessments, and actionable recommendations
                        based on the latest data.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted mx-auto mb-4" />
                    <p className="text-muted">Select a template to preview your report</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-card-foreground">
                <Calendar className="w-5 h-5 text-accent" />
                <span>Report History</span>
              </CardTitle>
              <CardDescription>Previously generated reports and downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {getTypeIcon(report.type)}
                      <div>
                        <h4 className="font-medium text-card-foreground">{report.name}</h4>
                        <p className="text-sm text-muted">{report.type}</p>
                        <p className="text-xs text-muted">
                          Generated: {new Date(report.generatedAt).toLocaleDateString()} • {report.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(report.status)} variant="secondary">
                        {report.status}
                      </Badge>
                      {report.status === "ready" && (
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-card-foreground">
                      {getTypeIcon(template.name)}
                      <span>{template.name}</span>
                    </CardTitle>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted">Pages</p>
                      <p className="font-medium text-card-foreground">~{template.estimatedPages}</p>
                    </div>
                    <div>
                      <p className="text-muted">Sections</p>
                      <p className="font-medium text-card-foreground">{template.sections.length}</p>
                    </div>
                    <div>
                      <p className="text-muted">Frequency</p>
                      <p className="font-medium text-card-foreground">{template.frequency}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-card-foreground">Sections:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section) => (
                        <Badge key={section} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      handleTemplateSelect(template.id)
                      // Switch to generate tab
                      const generateTab = document.querySelector('[value="generate"]') as HTMLElement
                      generateTab?.click()
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
