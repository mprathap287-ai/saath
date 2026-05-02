export default function AuroraBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Aurora Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep muted rose blob - top-right */}
        <div 
          className="absolute w-[300px] h-[300px] rounded-full opacity-35 blur-[80px]"
          style={{
            backgroundColor: '#4a1525',
            top: '10%',
            right: '10%',
            transform: 'translate(50%, -50%)'
          }}
        />
        
        {/* Dark indigo blob - bottom-left */}
        <div 
          className="absolute w-[250px] h-[250px] rounded-full opacity-40 blur-[80px]"
          style={{
            backgroundColor: '#1a1535',
            bottom: '15%',
            left: '10%',
            transform: 'translate(-50%, 50%)'
          }}
        />
      </div>
      
      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
