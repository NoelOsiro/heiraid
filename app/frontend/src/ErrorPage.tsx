import styles from "./ErrorPage.module.css";

// error page element
export default function ErrorPage() {
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.errorTitle}>Error</h1>
            <p className={styles.errorMessage}>Something went wrong. Please try again later.</p>
        </div>
    );
}