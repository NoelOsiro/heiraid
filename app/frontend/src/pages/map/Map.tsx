import { useEffect, useState, useRef } from "react";
import * as atlas from "azure-maps-control";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import styles from "./Map.module.css";
import { useLogin } from "../../authConfig";
import { IconButton, Panel, PanelType, SearchBox, Text } from "@fluentui/react";
import { Button } from "@fluentui/react-components";
import { History24Regular } from "@fluentui/react-icons";
import "azure-maps-control/dist/atlas.min.css";

const AZURE_MAPS_KEY = "2QnlfHAjF9XPEI2IMbBw1aUwkZ2LRw55udDqhZWKzRQnPvwASmhdJQQJ99BFAC5RqLJargg0AAAgAZMP1Fej"
if (!AZURE_MAPS_KEY) {
    throw new Error("Azure Maps key is not defined. Please set REACT_APP_AZURE_MAPS_KEY in your environment variables.");
}

// Sample data (put this at the top of your Map.tsx)
const sampleGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { NAME: "Ridgedale Park", neigh_risk_score: 5 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.35400706422691, 33.8512075933952],
            [-84.3542385587902, 33.8512095180327],
            [-84.3542240066879, 33.8518122650149],
            [-84.3539925364919, 33.8518098714627],
            [-84.35400706422691, 33.8512075933952]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { NAME: "Ridgedale Park", neigh_risk_score: 5 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.3561502492286, 33.8511825080714],
            [-84.3562351974736, 33.8511263124994],
            [-84.3562809058108, 33.8511732285499],
            [-84.3562941704169, 33.8511642314035],
            [-84.3563087144319, 33.8511791591499],
            [-84.3562956785784, 33.8511879999619],
            [-84.3562983798586, 33.8511907728628],
            [-84.3562728206877, 33.8512081074646],
            [-84.3561880584646, 33.8512648852364],
            [-84.3561246900322, 33.8511998435443],
            [-84.3561502492286, 33.8511825080714]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { NAME: "Ridgedale Park", neigh_risk_score: 5 },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.3549952520456, 33.8518202390717],
            [-84.3552792469328, 33.8518231734248],
            [-84.3552619553104, 33.8524231142311],
            [-84.3551229928813, 33.8524289674136],
            [-84.3550875456267, 33.8524303596335],
            [-84.3550343634193, 33.8524322126332],
            [-84.3549761028097, 33.8524339155802],
            [-84.3549952520456, 33.8518202390717]
          ]
        ]
      }
    }
  ]
};
// Initialize the Azure Maps control
const Chat = () => {
    const mapRef = useRef<HTMLDivElement>(null);
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


useEffect(() => {
    if (mapRef.current && AZURE_MAPS_KEY) {
        const map = new atlas.Map(mapRef.current, {
            center: [-84.3880, 33.7490],
            zoom: 13,
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: AZURE_MAPS_KEY
            }
        });

        map.events.add('ready', () => {
            // Add polygons from sampleGeoJson
            const dataSource = new atlas.source.DataSource();
            map.sources.add(dataSource);
            dataSource.add(sampleGeoJson);

            // Style polygons by neigh_risk_score (simple color ramp)
            map.layers.add(new atlas.layer.PolygonLayer(dataSource, undefined, {
                fillColor: [
                    'step',
                    ['get', 'neigh_risk_score'],
                    '#ffffcc', // score <= 2
                    2, '#ffeda0', // score <= 4
                    4, '#feb24c', // score <= 6
                    6, '#f03b20'  // score > 6
                ],
                fillOpacity: 0.6,
                strokeColor: "#333",
                strokeWidth: 2
            }));

            // Optional: Add popup on click
            map.events.add('click', (e: any) => {
                if (e.shapes && e.shapes.length > 0) {
                    const props = e.shapes[0].getProperties();
                    const popup = new atlas.Popup({
                        position: e.position,
                        content: `<div><strong>${props.NAME}</strong><br/>Risk Score: ${props.neigh_risk_score}</div>`
                    });
                    popup.open(map);
                }
            });
        });

        return () => map.dispose();
    }
}, []);
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
                                <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
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
