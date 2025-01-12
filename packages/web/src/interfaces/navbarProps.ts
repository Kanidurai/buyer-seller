export interface NavbarProps {
    sections: {
      aboutRef?: any;
    };
    activeTab?: number;
    setActiveTab?: (index: number) => void;
  }
  