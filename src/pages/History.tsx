
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, Search, ChevronDown, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import jsPDF from "jspdf";

interface HistoryItem {
  id: string;
  type: "text" | "image" | "video";
  timestamp: string;
  content: string;
  results: any;
}

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const historyData: HistoryItem[] = [
    {
      id: "1",
      type: "text",
      timestamp: new Date().toISOString(),
      content: "Sample text analysis",
      results: { sentiment: "positive", entities: ["example"] },
    },
    // Add more mock items as needed
  ];

  const filteredData = historyData.filter((item) => {
    const matchesSearch = item.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (item: HistoryItem) => {
    try {
      const pdf = new jsPDF();
      const margin = 20;
      let yPosition = margin;

      // Add title
      pdf.setFontSize(16);
      pdf.text(`Analysis Report - ${item.type.toUpperCase()}`, margin, yPosition);
      yPosition += 10;

      // Add metadata
      pdf.setFontSize(12);
      pdf.text(`Date: ${new Date(item.timestamp).toLocaleDateString()}`, margin, yPosition);
      yPosition += 10;
      pdf.text(`Content: ${item.content}`, margin, yPosition);
      yPosition += 10;

      // Add results
      pdf.text("Analysis Results:", margin, yPosition);
      yPosition += 10;

      Object.entries(item.results).forEach(([key, value]) => {
        const text = Array.isArray(value)
          ? `${key}: ${value.join(", ")}`
          : `${key}: ${value}`;
        
        // Check if text will overflow page
        if (yPosition > pdf.internal.pageSize.height - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.text(text, margin, yPosition);
        yPosition += 7;
      });

      pdf.save(`analysis-${item.id}.pdf`);

      toast({
        title: "Success",
        description: "Analysis results downloaded as PDF",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (item: HistoryItem) => {
    const route = `/analyse-${item.type}`;
    navigate(route, { state: { historyItem: item } });
  };

  return (
    <div className="flex flex-col items-center justify-center mx-[20vw] py-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-center w-full space-x-4">
        <h1 className="text-3xl font-bold dark:text-white">History</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search analyses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 dark:bg-[#2A2F3C] dark:text-white"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 dark:bg-[#2A2F3C] dark:text-white">
              <Calendar className="h-4 w-4" />
              Filter Type
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterType("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("text")}>Text</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("image")}>Image</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("video")}>Video</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border dark:border-white/10 w-full">
        <Table>
          <TableHeader>
            <TableRow className="dark:border-white/10">
              <TableHead className="dark:text-gray-300">Type</TableHead>
              <TableHead className="dark:text-gray-300">Date</TableHead>
              <TableHead className="dark:text-gray-300">Content</TableHead>
              <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="dark:border-white/10">
                <TableCell className="capitalize dark:text-white">{item.type}</TableCell>
                <TableCell className="dark:text-white">
                  {new Date(item.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell className="dark:text-white">{item.content}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(item)}
                    className="dark:bg-[#2A2F3C] dark:text-white"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(item)}
                    className="dark:bg-[#2A2F3C] dark:text-white"
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default History;
