import { getInitialDummyData } from './seed';

// Singleton in-memory state
let state = getInitialDummyData();

export const dummyStore = {
  // Reset store to initial seed
  reset() {
    state = getInitialDummyData();
  },

  // BRANCHES
  getBranches() {
    return [...state.branches];
  },

  getBranchById(id) {
    return state.branches.find((b) => b.id === id) || null;
  },

  addBranch(branchData) {
    const newBranch = {
      id: `b${state.branches.length + 1}`,
      name: branchData.name,
      location: branchData.location || branchData.city || 'Indonesia',
      address: branchData.address || '',
      phone: branchData.phone || '',
      capacity: Number(branchData.capacity) || 500,
      inmateCount: 0,
      adminCount: 1,
      status: branchData.status || 'Active',
      isActive: branchData.status !== 'Draft' && branchData.status !== 'Inactive',
      createdAt: new Date().toISOString(),
      ...branchData,
    };
    state.branches.unshift(newBranch);
    return newBranch;
  },

  updateBranch(id, updateData) {
    const idx = state.branches.findIndex((b) => b.id === id);
    if (idx !== -1) {
      state.branches[idx] = { ...state.branches[idx], ...updateData };
      return state.branches[idx];
    }
    return null;
  },

  // INMATES (WBP)
  getInmates({ branchId = null, search = '', status = '', limit = null } = {}) {
    let list = [...state.inmates];

    if (branchId && branchId !== 'ALL' && branchId !== 'All') {
      list = list.filter((i) => i.branchId === branchId);
    }

    if (status && status !== 'ALL' && status !== 'All') {
      list = list.filter((i) => i.status?.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.identifier?.toLowerCase().includes(q) ||
          i.wbpRegNumber?.toLowerCase().includes(q) ||
          i.blockRoom?.toLowerCase().includes(q)
      );
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  },

  getInmateById(idOrIdentifier) {
    if (!idOrIdentifier) return null;
    const clean = decodeURIComponent(idOrIdentifier).trim();
    return state.inmates.find(
      (i) =>
        i.id === clean ||
        i.identifier === clean ||
        i.wbpRegNumber === clean
    ) || null;
  },

  addInmate(inmateData) {
    const newInmate = {
      id: `napi-${Date.now()}`,
      identifier: inmateData.identifier || `NAPI-${Math.floor(1000 + Math.random() * 9000)}`,
      wbpRegNumber: inmateData.identifier || inmateData.wbpRegNumber || `NAPI-${Math.floor(1000 + Math.random() * 9000)}`,
      name: inmateData.name,
      initialPin: inmateData.initialPin || '1234',
      callBalance: Number(inmateData.callBalance) || 0,
      blockRoom: inmateData.blockRoom || 'Blok A - Kamar 01',
      entryDate: new Date().toISOString(),
      status: inmateData.status || 'Aktif',
      commStatus: inmateData.commStatus || 'Aktif',
      isActive: inmateData.isActive !== false,
      branchId: inmateData.branchId || 'b1',
      branchName: inmateData.branchName || 'Lapas Kelas I Cipinang',
    };
    state.inmates.unshift(newInmate);
    return newInmate;
  },

  updateInmate(idOrIdentifier, updateData) {
    const inmate = this.getInmateById(idOrIdentifier);
    if (inmate) {
      Object.assign(inmate, updateData);
      if (updateData.identifier) {
        inmate.wbpRegNumber = updateData.identifier;
      }
      return inmate;
    }
    return null;
  },

  updateInmateStatus(idOrIdentifier, isActive) {
    const inmate = this.getInmateById(idOrIdentifier);
    if (inmate) {
      inmate.isActive = isActive;
      inmate.commStatus = isActive ? 'Aktif' : 'Nonaktif';
      return inmate;
    }
    return null;
  },

  // PACKAGES
  getPackages(branchId = null) {
    if (branchId) {
      return state.packages.filter((p) => p.branchId === branchId);
    }
    return [...state.packages];
  },

  getPackageById(id) {
    return state.packages.find((p) => p.id === id) || null;
  },

  // CALL RECORDINGS
  getCalls({ branchId = null, search = '', status = '', limit = null } = {}) {
    let list = [...state.calls];

    if (branchId && branchId !== 'ALL' && branchId !== 'All') {
      list = list.filter((c) => c.branchId === branchId);
    }

    if (status && status !== 'ALL' && status !== 'All') {
      list = list.filter((c) => c.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.inmateName?.toLowerCase().includes(q) ||
          c.inmateId?.toLowerCase().includes(q) ||
          c.familyName?.toLowerCase().includes(q) ||
          c.familyPhone?.includes(q)
      );
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  },

  getCallById(id) {
    return state.calls.find((c) => c.id === id || c.callId === id) || null;
  },

  // TRANSACTIONS
  getTransactions({ branchId = null, category = '', search = '', limit = null } = {}) {
    let list = [...state.transactions];

    if (branchId && branchId !== 'ALL' && branchId !== 'All') {
      list = list.filter((t) => t.branchId === branchId);
    }

    if (category && category !== 'ALL' && category !== 'All') {
      list = list.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.inmateName?.toLowerCase().includes(q) ||
          t.inmateId?.toLowerCase().includes(q) ||
          t.id?.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
      );
    }

    if (limit) {
      list = list.slice(0, limit);
    }

    return list;
  },

  addTransaction(trxData) {
    const newTrx = {
      id: trxData.id || `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: trxData.date || new Date().toISOString(),
      status: trxData.status || 'Berhasil',
      method: trxData.method || 'Tunai',
      branchId: trxData.branchId || 'b1',
      ...trxData,
    };
    state.transactions.unshift(newTrx);
    return newTrx;
  },

  // USERS / STAFF
  getUsers(branchId = null) {
    if (branchId) {
      return state.users.filter((u) => u.branchId === branchId);
    }
    return [...state.users];
  },

  addUser(userData) {
    const newUser = {
      id: `usr-${Date.now()}`,
      status: 'Active',
      isActive: true,
      joinDate: new Date().toISOString(),
      branchId: userData.branchId || 'b1',
      branchName: userData.branchName || 'Lapas Kelas I Cipinang',
      ...userData,
    };
    state.users.unshift(newUser);
    return newUser;
  },

  updateUserStatus(id, isActive) {
    const user = state.users.find((u) => u.id === id);
    if (user) {
      user.isActive = isActive;
      user.status = isActive ? 'Active' : 'Suspended';
      return user;
    }
    return null;
  },

  // WARTEL UNITS
  getWartelUnits() {
    return [...state.wartelUnits];
  },

  updateWartelUnit(id, updateData) {
    const unit = state.wartelUnits.find((u) => u.id === id);
    if (unit) {
      Object.assign(unit, updateData);
      return unit;
    }
    return null;
  },

  // STATS CALCULATORS
  getSuperadminStats() {
    const totalCalls = state.calls.length;
    const answeredCalls = state.calls.filter((c) => c.status.toLowerCase() === 'answered').length;
    const successRate = totalCalls > 0 ? Math.round((answeredCalls / totalCalls) * 100) : 0;
    
    // Revenue from topups
    const totalRevenue = state.transactions
      .filter((t) => t.category === 'Kantin' || t.type === 'TOPUP_CASH')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    const activeBranches = state.branches.filter((b) => b.isActive).length;

    return {
      totalCalls,
      totalRevenue,
      activeBranches,
      successRate,
      answeredCalls,
      missedCalls: totalCalls - answeredCalls,
      totalInmates: state.inmates.length,
    };
  },

  getBranchStats(branchId = 'b1') {
    const branchCalls = state.calls.filter((c) => c.branchId === branchId);
    const totalCalls = branchCalls.length;
    const answeredCalls = branchCalls.filter((c) => c.status.toLowerCase() === 'answered').length;
    const missedCalls = branchCalls.filter((c) => c.status.toLowerCase() === 'missed' || c.status.toLowerCase() === 'busy').length;

    const branchTrx = state.transactions.filter((t) => t.branchId === branchId);
    const totalTransactions = branchTrx.length;
    
    // Saldo pemakaian (CALL_CHARGE)
    const totalUsage = branchTrx
      .filter((t) => t.category === 'Panggilan' || t.type === 'CALL_CHARGE')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    // Total topup kantin
    const totalTopup = branchTrx
      .filter((t) => t.category === 'Kantin' || t.type === 'TOPUP_CASH')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    const branchInmates = state.inmates.filter((i) => i.branchId === branchId);

    return {
      totalCalls,
      answeredCalls,
      missedCalls,
      totalTransactions,
      totalUsage,
      totalTopup,
      totalInmates: branchInmates.length,
    };
  },

  getCanteenStats(branchId = 'b1') {
    const branchTrx = state.transactions.filter((t) => t.branchId === branchId && (t.category === 'Kantin' || t.type === 'TOPUP_CASH'));
    const totalTopup = branchTrx.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    const today = new Date().toISOString().split('T')[0];
    const todayTrx = branchTrx.filter((t) => t.date && t.date.startsWith(today));
    const todayRevenue = todayTrx.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    return {
      totalTransactions: branchTrx.length,
      totalRevenue: totalTopup,
      todayTransactions: todayTrx.length,
      todayRevenue,
    };
  },

  getSupervisorStats(branchId = 'b1') {
    const branchPackages = state.packages.filter((p) => !p.branchId || p.branchId === branchId || p.branchId === 'all');
    const totalPackages = branchPackages.length;
    const activePackages = branchPackages.filter((p) => p.status === 'Aktif' || p.status === 'ACTIVE' || p.isActive === true).length;

    const branchTrx = state.transactions.filter((t) => !t.branchId || t.branchId === branchId);
    const today = new Date().toISOString().split('T')[0];
    const todayTrx = branchTrx.filter((t) => t.date && t.date.startsWith(today));
    const todayTransactions = todayTrx.length > 0 ? todayTrx.length : branchTrx.length;

    const branchInmates = state.inmates.filter((i) => !i.branchId || i.branchId === branchId);
    const totalInmates = branchInmates.length;

    return {
      totalPackages,
      activePackages,
      todayTransactions,
      totalInmates,
    };
  },
};
