import React, { useState } from "react";
import { TabsProps } from "./Tabs.interface";

import PaymentHelpers from "../../helpers/PaymentHelpers";
import Tab from "./Tab";

import styles from "./Tabs.module.scss";

const Tabs: React.FC<TabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState<number | undefined>(undefined);

  const handleTabActivation = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const isTabActive = (
    tabIndex: number,
    activeTabIndex: number | undefined
  ): boolean => {
    return tabIndex === activeTabIndex;
  };

  const isTabActiveFallback = (
    tabIndex: number,
    activeTabIndex: number | undefined
  ): boolean => {
    return tabIndex === 0 && activeTabIndex === undefined;
  };

  return (
    <div>
      <nav className={styles.tabs_labelsWrapper}>
        {props.paymentSections.map((section, index) => (
          <div
            key={"label_" + section.payment_type}
            className={`${styles.tabs_label} ${
              isTabActive(index, activeTab) ||
              isTabActiveFallback(index, activeTab)
                ? styles.active
                : ""
            }`}
            onClick={() => handleTabActivation(index)}
          >
            {section.payment_type}
          </div>
        ))}
      </nav>
      <div className={styles.tabs_wrapper}>
        {props.paymentSections.map((section, index) => (
          <div
            className={styles.tabs_itemWrapper}
            key={"tab_" + section.payment_type}
          >
            <Tab
              fields={PaymentHelpers.extractSectionFields(section)}
              isActive={isTabActive(index, activeTab)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
