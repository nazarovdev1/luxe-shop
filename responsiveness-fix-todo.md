# Shopping Cart Fixes

## Issues to Fix:
1. **Centering Issue**: + and - buttons in cart dropdown need proper centering
2. **Quantity Logic Issue**: Add to cart button increments quantity by 1, 3, 5 instead of just 1

## Steps:
- [x] Fix centering of + and - buttons in cart dropdown
- [x] Fix quantity increment logic in cart context  
- [ ] Test the changes to ensure proper functionality

## Technical Analysis:
- **Centering Fixed**: Added `justify-center`, `leading-none`, and proper flex alignment
- **Quantity Logic Fixed**: Added event prevention (`preventDefault`, `stopPropagation`) to prevent multiple rapid calls
- **Additional Safety**: Added `Math.max(0, ...)` to prevent negative quantities in cart
