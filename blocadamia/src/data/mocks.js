export const transactions = [
  { id: 1, date: '2025-09-01', recipient: '0xA1...b2', category: 'Food', amount: -24.5, status: 'success' },
  { id: 2, date: '2025-09-02', recipient: '0xC3...d4', category: 'Rent', amount: -300, status: 'pending' },
  { id: 3, date: '2025-09-03', recipient: '0xE5...f6', category: 'Books', amount: -40, status: 'failed' },
  { id: 4, date: '2025-09-04', recipient: '0x77...88', category: 'Misc', amount: -12.75, status: 'success' },
];

export const budgetAlloc = [
  { name: 'Food', value: 30 },
  { name: 'Rent', value: 40 },
  { name: 'Books', value: 15 },
  { name: 'Misc', value: 15 },
];

export const loans = [
  { id: 'L-1001', amount: 500, repaidPct: 60, due: '2025-10-10', status: 'active' },
  { id: 'L-1000', amount: 300, repaidPct: 100, due: '2025-08-12', status: 'paid' },
];

export const reputation = { score: 72, badges: [
  { id: 'b1', title: 'On-time Payer' },
  { id: 'b2', title: 'Trusted Peer' },
  { id: 'b3', title: 'Budget Keeper' },
]};

export const activity = [
  { id: 1, type: 'up', text: 'Paid loan installment on time' },
  { id: 2, type: 'down', text: 'Payment failed due to insufficient balance' },
  { id: 3, type: 'up', text: 'Completed KYC verification' },
];
