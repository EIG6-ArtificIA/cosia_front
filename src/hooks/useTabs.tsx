import { useConstCallback } from "powerhooks";
import { useEffect, useMemo, useState } from "react";

export type Tab<TabIds extends string[]> = {
  tabId: TabIds[number];
  label: string;
};

type Args<TabIds extends string[], T extends Tab<TabIds>[]> = {
  tabs: T;
  defaultTabId: TabIds[number];
  pageTitle: string;
};

export const useTabs = <TabIds extends string[], T extends Tab<TabIds>[]>({
  tabs,
  defaultTabId,
  pageTitle = "CoSIA",
}: Args<TabIds, T>) => {
  const [selectedTabId, setSelectedTabId] = useState<TabIds[number]>(
    window.location.hash.replace("#", "") || defaultTabId
  );

  const tabIds = useMemo(() => tabs.map((t) => t.tabId), [tabs]);

  const defaultTabLabel: string = useMemo(
    () => tabs.find((t) => t.tabId === defaultTabId)?.label || "Informations",
    [tabs]
  );

  useEffect(() => {
    const label = tabs.find((t) => t.tabId === selectedTabId)?.label || defaultTabLabel;
    document.title = `${pageTitle} - ${label}`;

    if (window.location.hash === "" && selectedTabId === defaultTabId) return;
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
