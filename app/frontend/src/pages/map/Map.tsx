// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Helmet } from "react-helmet-async";
// import { Text, IconButton, DefaultButton, SearchBox } from "@fluentui/react";
// import { Panel, PanelType } from "@fluentui/react/lib/Panel";
// import { useBoolean } from "@fluentui/react-hooks";
// import { useLogin } from "../../authConfig";
// import { HistoryButton } from "../../components/HistoryButton";

// // Icons will be added later
// import styles from "./Map.module.css";

// // Simple placeholder component for future map integration
// const Map: React.FC = () => {
//     const { t } = useTranslation();
//     const [isFilterPanelOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
//     const [isSearchExpanded, setIsSearchExpanded] = useState(false);
//     const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

//     const filters = [
//         { id: "hospitals", name: "Hospitals", count: 12 },
//         { id: "clinics", name: "Clinics", count: 24 },
//         { id: "pharmacies", name: "Pharmacies", count: 18 },
//         { id: "labs", name: "Labs", count: 7 }
//     ];

//     return (
//         <div className={`${styles.mapContainer} ${isFilterPanelOpen ? styles.panelOpen : ''}`}>
//             <Helmet>
//                 <title>{t("map.title", "Map")} - HeiRaid</title>
//             </Helmet>
//             <div className={styles.commandsSplitContainer}>
//                 <div className={styles.commandsContainer}>{useLogin && <HistoryButton className={styles.commandButton} onClick={openPanel} />}</div>
//             </div>

//             <div className={styles.mapArea}>
//                 <div className={styles.mapControls}>
//                     <IconButton iconProps={{ iconName: "Filter" }} title="Filters" onClick={openPanel} className={styles.controlButton} />
//                     <IconButton iconProps={{ iconName: "Search" }} title="Search" className={styles.controlButton} />
//                     <IconButton iconProps={{ iconName: "MyLocation" }} title="My location" className={styles.controlButton} />
//                 </div>

//                 <div className={styles.mapPlaceholder}>
//                     <div className={styles.mapPinIcon}>📍</div>
//                     <Text variant="xLarge" className={styles.mapPlaceholderText}>
//                         {t("map.placeholder", "Map View")}
//                     </Text>
//                     <Text variant="medium" className={styles.mapPlaceholderSubtext}>
//                         {t("map.placeholderDescription", "Interactive map will be displayed here")}
//                     </Text>
//                 </div>
//             </div>

//             <Panel
//                 isOpen={isFilterPanelOpen}
//                 onDismiss={dismissPanel}
//                 type={PanelType.customNear}
//                 closeButtonAriaLabel="Close"
//                 headerText={t("map.filters", "Filters")}
//                 className={styles.mobilePanel}
//                 customWidth="300px"
//                 isBlocking={false}
//             >
//                 <div className={styles.searchContainer}>
//                     <SearchBox
//                         placeholder={t("map.searchPlaceholder", "Search locations...")}
//                         className={styles.searchBox}
//                         onFocus={() => setIsSearchExpanded(true)}
//                         onBlur={() => setIsSearchExpanded(false)}
//                         iconProps={{ iconName: "Search" }}
//                     />
//                 </div>
//                 <div className={styles.filtersList}>
//                     {filters.map(filter => (
//                         <div
//                             key={filter.id}
//                             className={`${styles.filterItem} ${selectedFilter === filter.id ? styles.selected : ""}`}
//                             onClick={() => setSelectedFilter(filter.id === selectedFilter ? null : filter.id)}
//                         >
//                             <Text variant="medium">{filter.name}</Text>
//                             <Text variant="small" className={styles.filterCount}>
//                                 {filter.count}
//                             </Text>
//                         </div>
//                     ))}
//                 </div>
//             </Panel>
//         </div>
//     );
// };

// export default Map;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import styles from "./Map.module.css";

import { configApi } from "../../api";
import { useLogin } from "../../authConfig";
import { HistoryButton } from "../../components/HistoryButton";
import { IconButton, Panel, PanelType, SearchBox, Text } from "@fluentui/react";
import { Button } from "@fluentui/react-components";
import { History24Regular } from "@fluentui/react-icons";

const Chat = () => {
    const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const filters = [
        { id: "hospitals", name: "Hospitals", count: 12 },
        { id: "clinics", name: "Clinics", count: 24 },
        { id: "pharmacies", name: "Pharmacies", count: 18 },
        { id: "labs", name: "Labs", count: 7 }
    ];
    const { t, i18n } = useTranslation();
    return (
        <div className={styles.container}>
            {/* Setting the page title using react-helmet-async */}
            <Helmet>
                <title>{t("pageTitle")}</title>
            </Helmet>
            <div className={styles.commandsSplitContainer}>
                <div className={styles.commandsContainer}>
                    {useLogin && (
                        <div className={styles.commndButton}>
                            <Button icon={<History24Regular />} onClick={() => setIsHistoryPanelOpen(!isHistoryPanelOpen)}>
                                {t("maps.openFilters")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.chatRoot} style={{ marginLeft: isHistoryPanelOpen ? "300px" : "0" }}>
                <div className={styles.chatContainer}>
                    <div className={styles.chatEmptyState}>
                        <div className={styles.mapArea}>
                            <div className={styles.mapControls}>
                                <IconButton
                                    iconProps={{ iconName: "Filter" }}
                                    title="Filters"
                                    onClick={() => setIsHistoryPanelOpen(!isHistoryPanelOpen)}
                                    className={styles.controlButton}
                                />
                                <IconButton iconProps={{ iconName: "Search" }} title="Search" className={styles.controlButton} />
                                <IconButton iconProps={{ iconName: "MyLocation" }} title="My location" className={styles.controlButton} />
                            </div>

                            <div className={styles.mapPlaceholder}>
                                <div className={styles.mapPinIcon}>📍</div>
                                <Text variant="xLarge" className={styles.mapPlaceholderText}>
                                    {t("map.placeholder", "Map View")}
                                </Text>
                                <Text variant="medium" className={styles.mapPlaceholderSubtext}>
                                    {t("map.placeholderDescription", "Interactive map will be displayed here")}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
                {useLogin && (
                    <Panel
                        type={PanelType.customNear}
                        style={{ padding: "0px" }}
                        headerText={t("maps.filters")}
                        customWidth="300px"
                        isBlocking={false}
                        isOpen={isHistoryPanelOpen}
                        onDismiss={() => setIsHistoryPanelOpen(false)}
                    >
                        <div className={styles.searchContainer}>
                            <SearchBox
                                placeholder={t("map.searchPlaceholder", "Search locations...")}
                                className={styles.searchBox}
                                onFocus={() => setIsSearchExpanded(true)}
                                onBlur={() => setIsSearchExpanded(false)}
                                iconProps={{ iconName: "Search" }}
                            />
                        </div>
                        <div className={styles.filtersList}>
                            {filters.map(filter => (
                                <div
                                    key={filter.id}
                                    className={`${styles.filterItem} ${selectedFilter === filter.id ? styles.selected : ""}`}
                                    onClick={() => setSelectedFilter(filter.id === selectedFilter ? null : filter.id)}
                                >
                                    <Text variant="medium">{filter.name}</Text>
                                    <Text variant="small" className={styles.filterCount}>
                                        {filter.count}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </Panel>
                )}
            </div>
        </div>
    );
};

export default Chat;
