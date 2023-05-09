import { useConstCallback } from "powerhooks";
import { useEffect, useMemo, useState } from "react";

type Tab = {
  tabId: string;
  label: string;
};

type Args<T extends Tab[]> = {
  tabs: T;
  defaultTab: T[number];
  pageTitle: string;
};

export const useTabs = <T extends Tab[]>({ tabs, defaultTab, pageTitle = "CoSIA" }: Args<T>) => {
  const [selectedTabId, setSelectedTabId] = useState(
    window.location.hash.replace("#", "") || defaultTab.tabId
  );
  const tabIds = useMemo(() => tabs.map((t) => t.tabId), [tabs]);

  useEffect(() => {
    const label = tabs.find((t) => t.tabId === selectedTabId)?.label || defaultTab.label;
    document.title = `${pageTitle} - ${label}`;

    if (window.location.hash === "" && selectedTabId === defaultTab.tabId) return;
    window.location.hash = `#${selectedTabId}`;
  }, [selectedTabId]);

  const updateSelectedTabId = useConstCallback(() => {
    const actualHash = window.location.hash.slice(1);
    if (!tabIds.includes(actualHash) || actualHash === selectedTabId) return;

    setSelectedTabId(actualHash);
  });

  useEffect(() => {
    window.addEventListener("hashchange", updateSelectedTabId);
    return () => {
      window.removeEventListener("hashchange", updateSelectedTabId);
    };
  }, []);

  return { selectedTabId, setSelectedTabId };
};
