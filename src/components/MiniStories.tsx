type Story = { 
  name: string; 
  country?: string; 
  text: string; 
  imgAlt: string 
};

export default function MiniStories({ stories }: { stories: Story[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {stories.map((story, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-500" role="img" aria-label={story.imgAlt}>
                👤
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {story.name}
                {story.country && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    from {story.country}
                  </span>
                )}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {story.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}