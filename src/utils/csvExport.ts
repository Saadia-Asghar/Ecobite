export const exportUsersToCSV = (users: any[]) => {
    const headers = ['Name', 'Email', 'Role', 'Organization', 'EcoPoints', 'Location', 'Joined At'];
    const rows = users.map(u => [
        u.name,
        u.email,
        u.type,
        u.organization || '',
        u.ecoPoints,
        u.location || '',
        u.joinedAt
    ]);
    downloadCSV('users_report.csv', headers, rows);
};

export const exportDonationsToCSV = (donations: any[]) => {
    const headers = ['Food Type', 'Quantity', 'Status', 'Quality', 'Date', 'Location', 'Donor ID'];
    const rows = donations.map(d => [
        d.aiFoodType || 'Food Item',
        d.quantity,
        d.status,
        `${d.aiQualityScore}%`,
        new Date(d.createdAt).toLocaleDateString(),
        d.location || '',
        d.donorId
    ]);
    downloadCSV('donations_report.csv', headers, rows);
};

export const exportVouchersToCSV = (vouchers: any[]) => {
    const headers = ['Code', 'Title', 'Discount Type', 'Discount Value', 'Min Points', 'Redemptions', 'Status', 'Expiry'];
    const rows = vouchers.map(v => [
        v.code,
        v.title,
        v.discountType,
        v.discountValue,
        v.minEcoPoints,
        `${v.currentRedemptions}/${v.maxRedemptions}`,
        v.status,
        v.expiryDate
    ]);
    downloadCSV('vouchers_report.csv', headers, rows);
};

const downloadCSV = (filename: string, headers: string[], rows: any[][]) => {
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
