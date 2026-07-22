import { motion } from "motion/react";
import clsx from "clsx";

import styles from "./Sidebar.module.css";

export default function SidebarItem({
  icon,
  label,
  active,
  collapsed,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        x: collapsed ? 0 : 4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.15,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          styles.item,
          active && styles.itemActive
        )}
      >
        <div className={styles.itemIcon}>
          {icon}
        </div>

        {!collapsed && (
          <span className={styles.itemLabel}>
            {label}
          </span>
        )}
      </button>
    </motion.div>
  );
}