import { useState } from 'react';
import './Animations.css';
import './CaptureSection.css';
import './DarkMode.css';
import './DarkModeOptimizations.css';
import { AboutIcon, CaptureIcon, GalleryIcon, LoggingIcon, NavigateIcon, SettingsIcon, StorageIcon, ViewIcon } from './Icons';
import './MainPage.css';
import logo from './assets/flexlogo.png';

export default function MainPage() {
    const [activeSection, setActiveSection] = useState('navigate');
    const [moveToValues, setMoveToValues] = useState({ x: -6160, y: 16194, z: 7952 });
    const [autofocusSpeed, setAutofocusSpeed] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [resizeCapture, setResizeCapture] = useState(false);
    const [scanCapture, setScanCapture] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // State for collapsible sections
    const [expandedSections, setExpandedSections] = useState({
        configure: false,
        moveTo: true,
        autofocus: true,
        notes: false,
        annotations: false,
        tags: false,
        stackScan: false,
        smartStack: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleMenuHover = (menu) => {
        setOpenMenu(menu);
    };

    const closeMenu = () => {
        setOpenMenu(null);
    };

    const handleImageClick = (item) => {
        setSelectedImage(item);
        setActiveSection('view');
    };

    const handleAddImage = (item) => {
        setSelectedImage(item);
        setActiveSection('view');
        setZoomLevel(1);
        setPanX(0);
        setPanY(0);
    };

    const handleZoom = (direction) => {
        setZoomLevel(prev => {
            const newZoom = direction === 'in' ? prev + 0.2 : Math.max(0.5, prev - 0.2);
            return parseFloat(newZoom.toFixed(2));
        });
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPanX(e.clientX - dragStart.x);
        setPanY(e.clientY - dragStart.y);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        handleZoom(e.deltaY < 0 ? 'in' : 'out');
    };

    return (
        <div className={`main-page ${darkMode ? 'dark-mode' : ''}`}>
            {/* Header */}
            <header className="main-header">
                <div className="header-left">
                    <img src={logo} alt="Vyupath Flexture" className="header-logo" />
                    <h1 className="header-title">Vyupath Flexture Microscope</h1>
                </div>
                <div className="header-menu" onMouseLeave={closeMenu}>
                    <div className="menu-item" onMouseEnter={() => handleMenuHover('edit')}>
                        <span>Edit</span>
                        {openMenu === 'edit' && (
                            <div className="dropdown-menu">
                                <div className="menu-option">Undo</div>
                                <div className="menu-option">Redo</div>
                                <div className="menu-divider"></div>
                                <div className="menu-option">Cut</div>
                                <div className="menu-option">Copy</div>
                                <div className="menu-option">Paste</div>
                            </div>
                        )}
                    </div>

                    <div className="menu-item" onMouseEnter={() => handleMenuHover('view')}>
                        <span>View</span>
                        {openMenu === 'view' && (
                            <div className="dropdown-menu">
                                <div className="menu-option">Zoom In</div>
                                <div className="menu-option">Zoom Out</div>
                                <div className="menu-option">Reset Zoom</div>
                                <div className="menu-divider"></div>
                                <div className="menu-option">Full Screen</div>
                            </div>
                        )}
                    </div>

                    <div className="menu-item" onMouseEnter={() => handleMenuHover('window')}>
                        <span>Window</span>
                        {openMenu === 'window' && (
                            <div className="dropdown-menu">
                                <div className="menu-option">Minimize</div>
                                <div className="menu-option">Maximize</div>
                                <div className="menu-divider"></div>
                                <div className="menu-option">Close</div>
                            </div>
                        )}
                    </div>

                    <div className="menu-item" onMouseEnter={() => handleMenuHover('help')}>
                        <span>Help</span>
                        {openMenu === 'help' && (
                            <div className="dropdown-menu">
                                <div className="menu-option">Documentation</div>
                                <div className="menu-option">Tutorials</div>
                                <div className="menu-divider"></div>
                                <div className="menu-option">About</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Theme Toggle Button */}
                <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                    {darkMode ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>
            </header>

            <div className={`main-content ${activeSection === 'gallery' ? 'gallery-active' : ''} ${activeSection === 'view' ? 'view-active' : ''}`}>
                {/* Left Sidebar */}
                <aside className="sidebar">
                    <button
                        className={`sidebar-item ${activeSection === 'view' ? 'active' : ''}`}
                        onClick={() => setActiveSection('view')}
                    >
                        <span className="icon"><ViewIcon /></span>
                        <span className="label">View</span>
                    </button>

                    <button
                        className={`sidebar-item ${activeSection === 'gallery' ? 'active' : ''}`}
                        onClick={() => setActiveSection('gallery')}
                    >
                        <span className="icon"><GalleryIcon /></span>
                        <span className="label">Gallery</span>
                    </button>

                    <button
                        className={`sidebar-item ${activeSection === 'navigate' ? 'active' : ''}`}
                        onClick={() => setActiveSection('navigate')}
                    >
                        <span className="icon"><NavigateIcon /></span>
                        <span className="label">Navigate</span>
                    </button>

                    <button
                        className={`sidebar-item ${activeSection === 'capture' ? 'active' : ''}`}
                        onClick={() => setActiveSection('capture')}
                    >
                        <span className="icon"><CaptureIcon /></span>
                        <span className="label">Capture</span>
                    </button>

                    <button
                        className={`sidebar-item ${activeSection === 'storage' ? 'active' : ''}`}
                        onClick={() => setActiveSection('storage')}
                    >
                        <span className="icon"><StorageIcon /></span>
                        <span className="label">Storage</span>
                    </button>

                    <button
                        className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveSection('settings')}
                    >
                        <span className="icon"><SettingsIcon /></span>
                        <span className="label">Settings</span>
                    </button>

                    <button
                        className={`sidebar-item ${activeSection === 'logging' ? 'active' : ''}`}
                        onClick={() => setActiveSection('logging')}
                    >
                        <span className="icon"><LoggingIcon /></span>
                        <span className="label">Logging</span>
                    </button>

                    <button
                        className={`sidebar-item ${activeSection === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveSection('about')}
                    >
                        <span className="icon"><AboutIcon /></span>
                        <span className="label">About</span>
                    </button>
                </aside>

                {/* Control Panel */}
                <div className="control-panel">
                    {activeSection === 'navigate' && (
                        <>
                            {/* Configure Section */}
                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('configure')}>
                                    <span className="expand-icon">{expandedSections.configure ? '▼' : '▶'}</span>
                                    <span>Configure</span>
                                </div>
                                {expandedSections.configure && (
                                    <div className="section-content">
                                        <p className="section-placeholder">Configuration options</p>
                                    </div>
                                )}
                            </div>

                            {/* Move-to Section */}
                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('moveTo')}>
                                    <span className="expand-icon">{expandedSections.moveTo ? '▼' : '▶'}</span>
                                    <span>Move-to</span>
                                </div>
                                {expandedSections.moveTo && (
                                    <div className="section-content">
                                        <div className="input-grid">
                                            <div className="input-field">
                                                <label className="input-label">x</label>
                                                <input
                                                    type="number"
                                                    value={moveToValues.x}
                                                    onChange={(e) => setMoveToValues({ ...moveToValues, x: e.target.value })}
                                                    className="coordinate-input"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label className="input-label">y</label>
                                                <input
                                                    type="number"
                                                    value={moveToValues.y}
                                                    onChange={(e) => setMoveToValues({ ...moveToValues, y: e.target.value })}
                                                    className="coordinate-input"
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label className="input-label">z</label>
                                                <input
                                                    type="number"
                                                    value={moveToValues.z}
                                                    onChange={(e) => setMoveToValues({ ...moveToValues, z: e.target.value })}
                                                    className="coordinate-input"
                                                />
                                            </div>
                                        </div>
                                        <button className="move-button">MOVE</button>
                                    </div>
                                )}
                            </div>

                            {/* Autofocus Section */}
                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('autofocus')}>
                                    <span className="expand-icon">{expandedSections.autofocus ? '▼' : '▶'}</span>
                                    <span>Autofocus</span>
                                </div>
                                {expandedSections.autofocus && (
                                    <div className="section-content">
                                        <div className="autofocus-buttons">
                                            <button
                                                className={`speed-btn ${autofocusSpeed === 'fast' ? 'active' : ''}`}
                                                onClick={() => setAutofocusSpeed('fast')}
                                            >
                                                FAST
                                            </button>
                                            <button
                                                className={`speed-btn ${autofocusSpeed === 'medium' ? 'active' : ''}`}
                                                onClick={() => setAutofocusSpeed('medium')}
                                            >
                                                MEDIUM
                                            </button>
                                            <button
                                                className={`speed-btn ${autofocusSpeed === 'fine' ? 'active' : ''}`}
                                                onClick={() => setAutofocusSpeed('fine')}
                                            >
                                                FINE
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {activeSection === 'view' && (
                        <div className="view-controls"></div>
                    )}

                    {activeSection === 'capture' && (
                        <div className="capture-controls">
                            {/* Filename Input */}
                            <div className="control-section">
                                <div className="input-field">
                                    <label className="input-label">Filename</label>
                                    <input
                                        type="text"
                                        className="text-input"
                                        defaultValue="spinal_section_1"
                                        placeholder="Enter filename"
                                    />
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="control-section">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox-input" />
                                    <span>Temporary</span>
                                </label>

                                <div className="checkbox-divider"></div>

                                <div className="checkbox-row">
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="checkbox-input" />
                                        <span>Full resolution</span>
                                    </label>
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="checkbox-input" />
                                        <span>Store raw data</span>
                                    </label>
                                </div>

                                <div className="checkbox-divider"></div>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        checked={resizeCapture}
                                        onChange={(e) => setResizeCapture(e.target.checked)}
                                    />
                                    <span>Resize capture</span>
                                </label>

                                {/* Resolution Inputs */}
                                <div className="resolution-inputs">
                                    <input
                                        type="number"
                                        className="resolution-input"
                                        defaultValue="640"
                                        placeholder="Width"
                                        disabled={!resizeCapture}
                                    />
                                    <input
                                        type="number"
                                        className="resolution-input"
                                        defaultValue="480"
                                        placeholder="Height"
                                        disabled={!resizeCapture}
                                    />
                                </div>
                            </div>

                            {/* Collapsible Sections */}
                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('notes')}>
                                    <span className="expand-icon">{expandedSections.notes ? '▼' : '▶'}</span>
                                    <span>Notes</span>
                                </div>
                                {expandedSections.notes && (
                                    <div className="section-content">
                                        <textarea
                                            className="notes-textarea"
                                            placeholder="Add notes about this capture..."
                                            rows="3"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('annotations')}>
                                    <span className="expand-icon">{expandedSections.annotations ? '▼' : '▶'}</span>
                                    <span>Annotations</span>
                                </div>
                                {expandedSections.annotations && (
                                    <div className="section-content">
                                        <p className="section-placeholder">Annotation tools will appear here</p>
                                    </div>
                                )}
                            </div>

                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('tags')}>
                                    <span className="expand-icon">{expandedSections.tags ? '▼' : '▶'}</span>
                                    <span>Tags</span>
                                </div>
                                {expandedSections.tags && (
                                    <div className="section-content">
                                        <input
                                            type="text"
                                            className="text-input"
                                            placeholder="Add tags (comma separated)"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('stackScan')}>
                                    <span className="expand-icon">{expandedSections.stackScan ? '▼' : '▶'}</span>
                                    <span>Stack and Scan</span>
                                </div>
                                {expandedSections.stackScan && (
                                    <div className="section-content">
                                        {/* Scan Capture Checkbox */}
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                className="checkbox-input"
                                                checked={scanCapture}
                                                onChange={(e) => setScanCapture(e.target.checked)}
                                            />
                                            <span>Scan capture</span>
                                        </label>

                                        {/* Scan Options Dropdown */}
                                        <div className="input-field">
                                            <label className="input-label">Scan options</label>
                                            <select className="dropdown-select" disabled={!scanCapture}>
                                                <option>Default</option>
                                                <option>Custom</option>
                                                <option>Advanced</option>
                                            </select>
                                        </div>

                                        {/* Z-axis Inputs */}
                                        <div className="z-axis-inputs">
                                            <div className="input-field">
                                                <label className="input-label">z step: size</label>
                                                <input type="number" className="small-input" defaultValue="1000" disabled={!scanCapture} />
                                            </div>
                                            <div className="input-field">
                                                <label className="input-label">y step: size</label>
                                                <input type="number" className="small-input" defaultValue="1000" disabled={!scanCapture} />
                                            </div>
                                            <div className="input-field">
                                                <label className="input-label">z step: size</label>
                                                <input type="number" className="small-input" defaultValue="1000" disabled={!scanCapture} />
                                            </div>
                                        </div>

                                        <div className="z-axis-inputs">
                                            <div className="input-field">
                                                <label className="input-label">z steps</label>
                                                <input type="number" className="small-input" defaultValue="5" disabled={!scanCapture} />
                                            </div>
                                            <div className="input-field">
                                                <label className="input-label">y steps</label>
                                                <input type="number" className="small-input" defaultValue="5" disabled={!scanCapture} />
                                            </div>
                                            <div className="input-field">
                                                <label className="input-label">z steps</label>
                                                <input type="number" className="small-input" defaultValue="5" disabled={!scanCapture} />
                                            </div>
                                        </div>

                                        {/* AutoFocus Dropdown */}
                                        <div className="input-field">
                                            <label className="input-label">AutoFocus</label>
                                            <select className="dropdown-select" disabled={!scanCapture}>
                                                <option>None</option>
                                                <option>Fast</option>
                                                <option>Accurate</option>
                                            </select>
                                        </div>

                                        {/* Scan Style Dropdown */}
                                        <div className="input-field">
                                            <label className="input-label">Scan Style</label>
                                            <select className="dropdown-select" disabled={!scanCapture}>
                                                <option>Raster</option>
                                                <option>Snake</option>
                                                <option>Spiral</option>
                                            </select>
                                        </div>

                                        {/* Homing Style Dropdown */}
                                        <div className="input-field">
                                            <label className="input-label">Homing style</label>
                                            <select className="dropdown-select" disabled={!scanCapture}>
                                                <option>None</option>
                                                <option>Center</option>
                                                <option>Corner</option>
                                            </select>
                                        </div>


                                        {/* SCAN Button */}
                                        <button className="scan-button" disabled={!scanCapture}>SCAN</button>
                                    </div>
                                )}
                            </div>

                            <div className="control-section">
                                <div className="section-header" onClick={() => toggleSection('smartStack')}>
                                    <span className="expand-icon">{expandedSections.smartStack ? '▼' : '▶'}</span>
                                    <span>Smart Stack</span>
                                </div>
                                {expandedSections.smartStack && (
                                    <div className="section-content">
                                        <p className="section-placeholder">Smart stack options will appear here</p>
                                    </div>
                                )}
                            </div>

                            {/* Capture Button */}
                            <button className="capture-button">CAPTURE</button>
                        </div>
                    )}
                </div>

                {/* Microscope Viewer / Gallery */}
                {activeSection === 'gallery' ? (
                    <div className="gallery-grid">
                        {/* Sample gallery items */}
                        {[
                            { id: 1, name: 'smartStackScan-ABCD/scan_6', timestamp: '2021-08-23 16:33:58.122975', tag: 'CENTRAL_IMAGE', selected: false },
                            { id: 2, name: '8372.jpeg', timestamp: '2021-08-23 16:12:07.486543', tag: null, selected: false },
                            { id: 3, name: '8322.jpeg', timestamp: '2021-08-23 16:12:05.460494', tag: null, selected: false },
                            { id: 4, name: '8272.jpeg', timestamp: '2021-08-23 16:12:03.434445', tag: null, selected: false },
                            { id: 5, name: '8222.jpeg', timestamp: '2021-08-23 16:12:01.408396', tag: null, selected: false },
                            { id: 6, name: '8172.jpeg', timestamp: '2021-08-23 16:11:59.382347', tag: null, selected: false },
                        ].map(item => (
                            <div key={item.id} className={`gallery-card ${item.selected ? 'selected' : ''} ${selectedImage?.id === item.id ? 'active' : ''}`} onClick={() => handleImageClick(item)}>
                                <div className="gallery-image">
                                    <div className="image-placeholder">
                                        {/* Microscope image will appear here */}
                                    </div>
                                </div>
                                <div className="gallery-info">
                                    <div className="gallery-header">
                                        <h4 className="gallery-filename">{item.name}</h4>
                                        <button className="delete-btn" title="Delete" onClick={(e) => e.stopPropagation()}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="gallery-timestamp">{item.timestamp}</p>
                                    <p className="gallery-more">More...</p>
                                    {item.tag && <span className="gallery-tag">{item.tag}</span>}
                                    {!item.selected && (
                                        <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddImage(item); }}>ADD</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : activeSection === 'view' && selectedImage ? (
                    <div className="image-viewer-container">
                        <div 
                            className="image-viewer"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onWheel={handleWheel}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                        >
                            <div 
                                className="image-canvas"
                                style={{
                                    transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                                    transformOrigin: 'center center'
                                }}
                            >
                                <div className="image-placeholder-large"></div>
                            </div>
                        </div>
                        <div className="image-info-bottom">
                            <h3>{selectedImage.name}</h3>
                            <div className="zoom-controls">
                                <button onClick={() => handleZoom('out')} title="Zoom Out">−</button>
                                <span>{(zoomLevel * 100).toFixed(0)}%</span>
                                <button onClick={() => handleZoom('in')} title="Zoom In">+</button>
                                <button onClick={() => { setZoomLevel(1); setPanX(0); setPanY(0); }} title="Reset">Reset</button>
                            </div>
                        </div>
                    </div>
                ) : activeSection === 'view' ? (
                    <div className="empty-viewer"></div>
                ) : (
                    <div className="microscope-viewer">
                        <div className="viewer-placeholder">
                            <p>Microscope Feed</p>
                            <small>Camera stream will appear here</small>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
