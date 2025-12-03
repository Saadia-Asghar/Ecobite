# DELETE VOUCHER IMPLEMENTATION - COPY & PASTE GUIDE

## STEP 1: Add the Delete Function

**Location:** After line 257 in `src/components/roles/AdminDashboard.tsx`  
**After the closing brace of:** `toggleVoucherStatus` function

**Code to add:**

```typescript
const deleteVoucher = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
        return;
    }
    
    setLoadingVoucher(id);
    
    try {
        await fetch(`http://localhost:3002/api/vouchers/${id}`, {
            method: 'DELETE'
        });
        await logAction('DELETE_VOUCHER', id, `Deleted voucher: ${title}`);
        setVouchers(prev => prev.filter(v => v.id !== id));
        alert('✅ Voucher deleted successfully!');
    } catch (error) {
        // Mock delete
        setVouchers(prev => prev.filter(v => v.id !== id));
        await logAction('DELETE_VOUCHER', id, `Deleted voucher: ${title} (Mock)`);
        alert('✅ Voucher deleted (Mock mode)');
    } finally {
        setLoadingVoucher(null);
    }
};
```

---

## STEP 2: Add the Delete Button

**Location:** Around line 714 in `src/components/roles/AdminDashboard.tsx`  
**Inside the voucher card, after the Play/Pause button**

**Find this section:**
```tsx
<button 
    onClick={() => toggleVoucherStatus(v.id, v.status)} 
    disabled={loadingVoucher === v.id}
    className={`p-2 rounded-lg transition-all ${loadingVoucher === v.id ? 'opacity-50 cursor-not-allowed' : ''} ${v.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    title={v.status === 'active' ? 'Pause Voucher' : 'Activate Voucher'}
>
    {loadingVoucher === v.id ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : (
        v.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />
    )}
</button>
```

**Add this button AFTER the above button (but still inside the same `<div className="flex gap-2">`):**

```tsx
<button 
    onClick={() => deleteVoucher(v.id, v.title)} 
    disabled={loadingVoucher === v.id}
    className={`p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all ${loadingVoucher === v.id ? 'opacity-50 cursor-not-allowed' : ''}`}
    title="Delete Voucher"
>
    {loadingVoucher === v.id ? (
        <div className="w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin" />
    ) : (
        <Trash2 className="w-4 h-4" />
    )}
</button>
```

---

## COMPLETE BUTTON SECTION (for reference)

After your changes, the complete button section should look like this:

```tsx
<div className="flex gap-2">
    <button 
        onClick={() => fetchVoucherRedemptions(v.id)} 
        disabled={loadingVoucher === v.id}
        className={`p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all ${loadingVoucher === v.id ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="View Redemptions"
    >
        {loadingVoucher === v.id ? (
            <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
        ) : (
            <Users className="w-4 h-4" />
        )}
    </button>
    <button 
        onClick={() => toggleVoucherStatus(v.id, v.status)} 
        disabled={loadingVoucher === v.id}
        className={`p-2 rounded-lg transition-all ${loadingVoucher === v.id ? 'opacity-50 cursor-not-allowed' : ''} ${v.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        title={v.status === 'active' ? 'Pause Voucher' : 'Activate Voucher'}
    >
        {loadingVoucher === v.id ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
            v.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />
        )}
    </button>
    <button 
        onClick={() => deleteVoucher(v.id, v.title)} 
        disabled={loadingVoucher === v.id}
        className={`p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all ${loadingVoucher === v.id ? 'opacity-50 cursor-not-allowed' : ''}`}
        title="Delete Voucher"
    >
        {loadingVoucher === v.id ? (
            <div className="w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin" />
        ) : (
            <Trash2 className="w-4 h-4" />
        )}
    </button>
</div>
```

---

## VERIFICATION CHECKLIST

After making the changes:

- [ ] The file has no TypeScript errors
- [ ] All three buttons appear in the voucher card
- [ ] Delete button is red colored
- [ ] Delete button shows trash icon
- [ ] Clicking delete shows confirmation dialog
- [ ] After confirming, voucher is removed from list
- [ ] Success alert appears
- [ ] Loading spinner shows during deletion

---

## MANUAL STEPS TO IMPLEMENT

1. Open `src/components/roles/AdminDashboard.tsx`
2. Find line 257 (end of `toggleVoucherStatus` function)
3. Add a blank line and paste the `deleteVoucher` function
4. Find line ~714 (the voucher buttons section)
5. After the Play/Pause button, add the Delete button code
6. Save the file
7. Check for any TypeScript errors
8. Test in the browser

---

## TROUBLESHOOTING

**If you get TypeScript errors:**
- Make sure `Trash2` is imported at the top: `import { ..., Trash2 } from 'lucide-react';`
- Check that all curly braces are properly matched
- Verify the function is inside the component (before the return statement)

**If the button doesn't appear:**
- Check the browser console for errors
- Verify the button is inside the `<div className="flex gap-2">` container
- Make sure you're in the Vouchers tab of the admin dashboard

**If clicking doesn't work:**
- Check that `deleteVoucher` function is defined
- Verify `loadingVoucher` state exists
- Check browser console for JavaScript errors
