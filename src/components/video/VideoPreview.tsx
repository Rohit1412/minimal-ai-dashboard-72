
interface VideoPreviewProps {
  videoUrl: string;
}

const VideoPreview = ({ videoUrl }: VideoPreviewProps) => {
  if (!videoUrl) return null;

  return (
    <div className="aspect-video w-full bg-black/10 rounded-lg overflow-hidden" style={{ height: '40vh' }}>
      <iframe
        src={videoUrl}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPreview;
