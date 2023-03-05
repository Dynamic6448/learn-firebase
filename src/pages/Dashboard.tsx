import React, { useCallback, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Calendar from './Dashboard Sections/Calendar';
import Notes from './Dashboard Sections/Notes';

const Dashboard: React.FC = () => {
    const { currentUser } = useAuth();
    const [selectedSection, setSelectedSection] = useState(0);

    const getSection = useCallback(() => {
        switch (selectedSection) {
            case 0:
                return <Notes />;
            case 1:
                return <Calendar />;
            default:
                return <Notes />;
        }
    }, [selectedSection]);

    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-64 h-full bg-white shadow-xl'>
                <div className='p-4'>
                    <p className='text-xl font-semibold'>Dashboard</p>
                    <p className='text-md'>{currentUser.email}</p>
                </div>
                <SidebarButton active={selectedSection === 0} onClick={() => setSelectedSection(0)}>
                    Notes
                </SidebarButton>
                <SidebarButton active={selectedSection === 1} onClick={() => setSelectedSection(1)}>
                    Calendar
                </SidebarButton>
            </div>
            {getSection()}
        </div>
    );
};

const SidebarButton: React.FC<{ active: boolean; onClick: () => any; children: React.ReactNode }> = ({ active, onClick, children }) => {
    return (
        <button className={`w-full py-4 ${active ? 'bg-gray-200' : 'bg-white'} ${active ? 'hover:bg-gray-300' : 'hover:bg-gray-100'} transition text-start`} onClick={onClick}>
            <p className='pl-4'>{children}</p>
        </button>
    );
};

export default Dashboard;
