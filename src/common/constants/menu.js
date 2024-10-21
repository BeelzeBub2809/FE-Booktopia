import { role } from '../../utils/config';
import { link } from './link';

export const menu = [
    {
        label: 'Product',
        url: link.SALES_PRODUCT,
        iconUrl: 'fa fa-book fa-large',
        allowedRoles: [role.ADMIN, role.SALES],
    },
    {
        label: 'Category',
        url: link.SALES_CATEGORY,
        iconUrl: 'fa fa-filter fa-large',
        allowedRoles: [role.ADMIN, role.SALES],
    },
]