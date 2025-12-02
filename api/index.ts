let dbInitialized = false;

export default async function handler(req: any, res: any) {
    try {
        // Dynamic imports to catch loading errors (e.g. native modules like sqlite3)
        const { default: app } = await import('../server/app');
        const { initDB } = await import('../server/db');

        if (!dbInitialized) {
            try {
                await initDB();
                dbInitialized = true;
            } catch (error: any) {
                console.error('Failed to initialize database:', error);
                return res.status(500).json({
                    error: 'Database initialization failed',
                    details: error.message,
                    stack: error.stack
                });
            }
        }

        return app(req, res);
    } catch (error: any) {
        console.error('Server startup failed:', error);
        return res.status(500).json({
            error: 'Server startup failed',
            details: error.message,
            stack: error.stack
        });
    }
}
