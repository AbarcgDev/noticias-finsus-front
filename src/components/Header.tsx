import { Clock } from 'lucide-react';

// Componente Header
export const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-brand">
                    <img
                        src="/logo-finsus.png"
                        alt="Logo"
                        className="brand-logo"
                    />
                </div>

                {/* Información central */}
                <div className="header-info">
                    <div className="current-time">
                        <Clock size={16} />
                        <span>{new Date().toLocaleTimeString('es-MX', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
