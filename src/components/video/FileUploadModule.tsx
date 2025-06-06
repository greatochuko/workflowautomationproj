
import { NotificationBanner } from "@/components/ui/notification-banner";
import { cn } from "@/lib/utils";
import { VideoTypeSelector } from "./upload/VideoTypeSelector";
import { FileUploadZone } from "./upload/FileUploadZone";
import { VideoCarousel } from "./upload/VideoCarousel";
import { SubmissionForm } from "./upload/SubmissionForm";
import { useFileUpload } from "./upload/useFileUpload";
import { useSubmissionData } from "./upload/useSubmissionData";
import { FileWithPreview, SubmissionData } from "./upload/types";

interface FileUploadModuleProps {
  maxFiles?: number;
  onFilesSelected: (
    files: File[], 
    metadata: { [key: string]: { title: string; description: string } },
    submissionData: SubmissionData
  ) => void;
  className?: string;
  videoTypes?: string[];
  isProcessing?: boolean;
}

// Default video types (if not provided)
const DEFAULT_VIDEO_TYPES = [
  "Dialogue",
  "Evergreen Content",
  "Exercises", 
  "Huge Client Win",
  "Partnership/Sponsorship",
  "Testimonial"
].sort();

export function FileUploadModule({ 
  maxFiles = 5, 
  onFilesSelected,
  className,
  videoTypes = DEFAULT_VIDEO_TYPES,
  isProcessing = false
}: FileUploadModuleProps) {
  
  const {
    uploadedFiles,
    metadata,
    error: fileError,
    setError: setFileError,
    handleFiles,
    removeFile,
    updateMetadata
  } = useFileUpload(maxFiles);
  
  const {
    submissionTitle,
    setSubmissionTitle,
    submissionDescription,
    setSubmissionDescription,
    videoType,
    setVideoType,
    targetDate,
    setTargetDate,
    error: submissionError,
    setError: setSubmissionError,
    validateSubmission
  } = useSubmissionData(videoTypes[0] || "");

  const error = fileError || submissionError;

  const handleSubmit = () => {
    if (!validateSubmission()) {
      return;
    }

    // All validation passed, send data
    onFilesSelected(
      uploadedFiles, 
      metadata, 
      {
        title: submissionTitle,
        description: submissionDescription,
        videoType: videoType,
        targetDate: targetDate
      }
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {error && (
        <NotificationBanner
          message={error}
          type="error"
          onDismiss={() => {
            setFileError(null);
            setSubmissionError(null);
          }}
        />
      )}
      
      {/* Video Type Selection */}
      <VideoTypeSelector
        value={videoType}
        onChange={setVideoType}
        videoTypes={videoTypes}
        disabled={isProcessing}
      />
      
      {/* File Upload Area */}
      <FileUploadZone
        onFilesSelected={handleFiles}
        maxFiles={maxFiles}
        disabled={isProcessing}
      />
      
      {/* List of uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Uploaded Files ({uploadedFiles.length}/{maxFiles})</h3>
          
          <VideoCarousel
            files={uploadedFiles}
            metadata={metadata}
            onRemove={removeFile}
            onMetadataChange={updateMetadata}
          />
          
          <SubmissionForm
            title={submissionTitle}
            description={submissionDescription}
            targetDate={targetDate}
            onTitleChange={setSubmissionTitle}
            onDescriptionChange={setSubmissionDescription}
            onTargetDateChange={setTargetDate}
            onSubmit={handleSubmit}
            filesCount={uploadedFiles.length}
            disabled={isProcessing}
          />
        </div>
      )}
    </div>
  );
}
