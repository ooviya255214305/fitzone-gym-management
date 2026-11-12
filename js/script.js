/**
 * FITZONE GYM MANAGEMENT SYSTEM - CORE SCRIPT
 * Version: 2.0 (Modern Dark Gym Edition)
 * Architecture: Vanilla JavaScript with LocalStorage Persistence
 */

(function () {
  'use strict';

  // =========================================================================
  // STORAGE & DATA MODEL INITIALIZATION
  // =========================================================================
  const STORAGE_KEY = 'fitzone_gym_db_v2';

  const DEFAULT_PLANS = [
    {
      id: 'plan_monthly',
      name: 'Monthly Starter',
      durationMonths: 1,
      price: 49,
      features: [
        'Full gym floor access',
        'Standard locker room access',
        'Free fitness assessment',
        '1 complimentary trainer consult'
      ],
      isPopular: false
    },
    {
      id: 'plan_quarterly',
      name: 'Quarterly Pro',
      durationMonths: 3,
      price: 129,
      features: [
        'Everything in Monthly Starter',
        'Full cardio & free weights access',
        'Sauna & steam room access',
        '2 Personal training sessions',
        'FitZone mobile app tracking'
      ],
      isPopular: true
    },
    {
      id: 'plan_halfyearly',
      name: 'Half-Year Elite',
      durationMonths: 6,
      price: 239,
      features: [
        'Everything in Quarterly Pro',
        'Unlimited group fitness classes',
        'Dedicated VIP locker storage',
        'Monthly body composition scan',
        'Guest pass (1 per month)'
      ],
      isPopular: false
    },
    {
      id: 'plan_yearly',
      name: 'Annual VIP Athlete',
      durationMonths: 12,
      price: 449,
      features: [
        'All-inclusive 24/7 unlimited access',
        'Personal coach assignment',
        'Customized nutrition & workout plans',
        'Complimentary towel & shake service',
        'Unlimited guest privileges'
      ],
      isPopular: false
    }
  ];

  const DEFAULT_TRAINERS = [
    {
      id: 'TR-101',
      name: 'Marcus Vance',
      specialization: 'Hypertrophy & Bodybuilding',
      experience: '8 Years',
      phone: '+1 (555) 432-8921',
      email: 'marcus.vance@fitzone.com',
      rating: 4.9,
      bio: 'Former competitive powerlifter and IFBB coach specializing in muscle hypertrophy and posture correction.',
      avatarInitials: 'MV'
    },
    {
      id: 'TR-102',
      name: 'Elena Rostova',
      specialization: 'CrossFit & Conditioning',
      experience: '6 Years',
      phone: '+1 (555) 765-4321',
      email: 'elena.r@fitzone.com',
      rating: 4.8,
      bio: 'Certified CrossFit Level 3 trainer passionate about high-intensity interval training, agility, and athletic stamina.',
      avatarInitials: 'ER'
    },
    {
      id: 'TR-103',
      name: 'Darius Thorne',
      specialization: 'Strength & Powerlifting',
      experience: '10 Years',
      phone: '+1 (555) 889-1234',
      email: 'darius.t@fitzone.com',
      rating: 5.0,
      bio: 'National powerlifting record holder focusing on deadlift/squat mechanics, biomechanics, and raw power development.',
      avatarInitials: 'DT'
    },
    {
      id: 'TR-104',
      name: 'Maya Chen',
      specialization: 'Mobility & Functional Flow',
      experience: '5 Years',
      phone: '+1 (555) 345-6789',
      email: 'maya.c@fitzone.com',
      rating: 4.9,
      bio: 'Specialist in flexibility, restorative yoga, core foundation, and injury rehabilitation for active athletes.',
      avatarInitials: 'MC'
    }
  ];

  const DEFAULT_WORKOUT_PLANS = [
    {
      id: 'WP-101',
      name: 'Hypertrophy 4-Day Split',
      goal: 'Muscle Building',
      difficulty: 'Intermediate',
      duration: '8 Weeks',
      schedule: [
        { day: 'Monday', focus: 'Chest & Triceps', exercises: 'Barbell Bench Press (4x10), Incline Dumbbell Press (3x12), Cable Chest Flyes (3x15), Tricep Rope Pushdown (4x12)' },
        { day: 'Tuesday', focus: 'Back & Biceps', exercises: 'Conventional Deadlift (4x6), Lat Pulldowns (4x10), Seated Cable Rows (3x12), Barbell Bicep Curls (3x12)' },
        { day: 'Wednesday', focus: 'Active Recovery', exercises: '20-min Incline Treadmill Walk, Foam Rolling, Mobility Drills' },
        { day: 'Thursday', focus: 'Shoulders & Traps', exercises: 'Overhead Barbell Press (4x8), Dumbbell Lateral Raises (4x15), Face Pulls (3x15), Dumbbell Shrugs (3x12)' },
        { day: 'Friday', focus: 'Legs & Calves', exercises: 'Barbell Back Squats (4x8), Leg Press (3x12), Romanian Deadlifts (3x10), Standing Calf Raises (4x20)' },
        { day: 'Saturday', focus: 'Core & Conditioning', exercises: 'Hanging Leg Raises (4x15), Ab Wheel Rollouts (3x12), 15-min Stair Climber HIIT' }
      ]
    },
    {
      id: 'WP-102',
      name: 'HIIT Fat Shredder Pro',
      goal: 'Weight Loss & Endurance',
      difficulty: 'Advanced',
      duration: '6 Weeks',
      schedule: [
        { day: 'Monday', focus: 'Full Body Circuit A', exercises: 'Kettlebell Swings (4x20), Box Jumps (4x15), Burpees (4x15), Battle Ropes (4x40s)' },
        { day: 'Tuesday', focus: 'Cardio Intervals', exercises: 'Sprint Intervals 30s On / 30s Off (15 rounds), Rowing Machine 2000m' },
        { day: 'Wednesday', focus: 'Core & Mobility', exercises: 'Plank Variations (4x60s), Russian Twists (4x25), Dynamic Yoga Flow' },
        { day: 'Thursday', focus: 'Full Body Circuit B', exercises: 'Dumbbell Thrusters (4x12), Slam Balls (4x15), Jump Rope (4x2min)' },
        { day: 'Friday', focus: 'Metabolic Conditioning', exercises: 'Assault Bike Sprint (10x1min), Farmer Carries (4x50m)' },
        { day: 'Saturday', focus: 'Outdoor Endurance', exercises: '5km Outdoor Run or 45-min Zone 2 Cycling' }
      ]
    },
    {
      id: 'WP-103',
      name: 'Powerlifting 5x5 Foundation',
      goal: 'Maximal Strength',
      difficulty: 'Beginner - Intermediate',
      duration: '12 Weeks',
      schedule: [
        { day: 'Monday', focus: 'Heavy Squat Day', exercises: 'Low Bar Squats (5x5 @ 80%), Overhead Press (5x5), Barbell Pendlay Rows (5x5)' },
        { day: 'Wednesday', focus: 'Heavy Bench Day', exercises: 'Competition Bench Press (5x5), Conventional Deadlift (1x5 heavy), Dips (3x10)' },
        { day: 'Friday', focus: 'Volume Squat & Pull', exercises: 'Squats (5x5 @ 70%), Incline Bench (3x8), Pull-ups (4xMax), Core Hollow Holds' }
      ]
    }
  ];

  // Helper date generators for realistic timestamps
  function getDateOffset(daysOffset) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    return d.toISOString().split('T')[0];
  }

  const DEFAULT_MEMBERS = [
    {
      id: 'FZ-201',
      name: 'Alexander Stone',
      email: 'a.stone@gmail.com',
      phone: '+1 (555) 234-8901',
      gender: 'Male',
      age: 29,
      planId: 'plan_yearly',
      trainerId: 'TR-101',
      workoutPlanId: 'WP-101',
      startDate: getDateOffset(-60),
      endDate: getDateOffset(305),
      status: 'active',
      emergencyContact: '+1 (555) 998-1122 (Wife - Sarah)',
      joinDate: getDateOffset(-60),
      avatarInitials: 'AS'
    },
    {
      id: 'FZ-202',
      name: 'Sophia Miller',
      email: 'sophia.m@outlook.com',
      phone: '+1 (555) 345-9012',
      gender: 'Female',
      age: 26,
      planId: 'plan_quarterly',
      trainerId: 'TR-102',
      workoutPlanId: 'WP-102',
      startDate: getDateOffset(-30),
      endDate: getDateOffset(60),
      status: 'active',
      emergencyContact: '+1 (555) 778-3344 (Father)',
      joinDate: getDateOffset(-30),
      avatarInitials: 'SM'
    },
    {
      id: 'FZ-203',
      name: 'Liam Henderson',
      email: 'liam.henderson@techcorp.io',
      phone: '+1 (555) 456-0123',
      gender: 'Male',
      age: 34,
      planId: 'plan_monthly',
      trainerId: 'TR-103',
      workoutPlanId: 'WP-103',
      startDate: getDateOffset(-45),
      endDate: getDateOffset(-15),
      status: 'expired',
      emergencyContact: '+1 (555) 667-8899 (Brother)',
      joinDate: getDateOffset(-45),
      avatarInitials: 'LH'
    },
    {
      id: 'FZ-204',
      name: 'Isabella Rodriguez',
      email: 'isabella.r@icloud.com',
      phone: '+1 (555) 567-1234',
      gender: 'Female',
      age: 24,
      planId: 'plan_halfyearly',
      trainerId: 'TR-104',
      workoutPlanId: 'WP-102',
      startDate: getDateOffset(-10),
      endDate: getDateOffset(170),
      status: 'active',
      emergencyContact: '+1 (555) 556-7788 (Mother)',
      joinDate: getDateOffset(-10),
      avatarInitials: 'IR'
    },
    {
      id: 'FZ-205',
      name: 'Jameson Wu',
      email: 'j.wu@creativemedia.com',
      phone: '+1 (555) 678-2345',
      gender: 'Male',
      age: 31,
      planId: 'plan_quarterly',
      trainerId: 'TR-101',
      workoutPlanId: 'WP-101',
      startDate: getDateOffset(-75),
      endDate: getDateOffset(15),
      status: 'active',
      emergencyContact: '+1 (555) 445-6677 (Partner)',
      joinDate: getDateOffset(-75),
      avatarInitials: 'JW'
    },
    {
      id: 'FZ-206',
      name: 'Emma Watson-Blake',
      email: 'emma.blake@designhub.co',
      phone: '+1 (555) 789-3456',
      gender: 'Female',
      age: 28,
      planId: 'plan_monthly',
      trainerId: 'TR-104',
      workoutPlanId: 'WP-102',
      startDate: getDateOffset(-3),
      endDate: getDateOffset(27),
      status: 'active',
      emergencyContact: '+1 (555) 334-5566 (Sister)',
      joinDate: getDateOffset(-3),
      avatarInitials: 'EB'
    },
    {
      id: 'FZ-207',
      name: 'Brandon Cole',
      email: 'bcole.athletics@gmail.com',
      phone: '+1 (555) 890-4567',
      gender: 'Male',
      age: 39,
      planId: 'plan_monthly',
      trainerId: 'TR-103',
      workoutPlanId: 'WP-103',
      startDate: getDateOffset(-5),
      endDate: getDateOffset(25),
      status: 'pending',
      emergencyContact: '+1 (555) 223-4455 (Friend)',
      joinDate: getDateOffset(-5),
      avatarInitials: 'BC'
    },
    {
      id: 'FZ-208',
      name: 'Chloe Davenport',
      email: 'chloe.dav@nexus.org',
      phone: '+1 (555) 901-5678',
      gender: 'Female',
      age: 32,
      planId: 'plan_yearly',
      trainerId: 'TR-102',
      workoutPlanId: 'WP-101',
      startDate: getDateOffset(-120),
      endDate: getDateOffset(245),
      status: 'active',
      emergencyContact: '+1 (555) 112-3344 (Husband)',
      joinDate: getDateOffset(-120),
      avatarInitials: 'CD'
    }
  ];

  const DEFAULT_PAYMENTS = [
    {
      id: 'PAY-1001',
      memberId: 'FZ-201',
      memberName: 'Alexander Stone',
      planName: 'Annual VIP Athlete',
      amount: 449,
      date: getDateOffset(-60),
      method: 'Credit Card',
      status: 'Paid',
      notes: 'Annual upfront payment with promo discount'
    },
    {
      id: 'PAY-1002',
      memberId: 'FZ-202',
      memberName: 'Sophia Miller',
      planName: 'Quarterly Pro',
      amount: 129,
      date: getDateOffset(-30),
      method: 'Debit Card',
      status: 'Paid',
      notes: 'Fall quarterly membership installment'
    },
    {
      id: 'PAY-1003',
      memberId: 'FZ-204',
      memberName: 'Isabella Rodriguez',
      planName: 'Half-Year Elite',
      amount: 239,
      date: getDateOffset(-10),
      method: 'Credit Card',
      status: 'Paid',
      notes: 'Elite access enrollment'
    },
    {
      id: 'PAY-1004',
      memberId: 'FZ-205',
      memberName: 'Jameson Wu',
      planName: 'Quarterly Pro',
      amount: 129,
      date: getDateOffset(-75),
      method: 'UPI / Online',
      status: 'Paid',
      notes: 'Renewal cycle Q3'
    },
    {
      id: 'PAY-1005',
      memberId: 'FZ-206',
      memberName: 'Emma Watson-Blake',
      planName: 'Monthly Starter',
      amount: 49,
      date: getDateOffset(-3),
      method: 'Cash',
      status: 'Paid',
      notes: 'Front-desk cash deposit'
    },
    {
      id: 'PAY-1006',
      memberId: 'FZ-207',
      memberName: 'Brandon Cole',
      planName: 'Monthly Starter',
      amount: 49,
      date: getDateOffset(-5),
      method: 'Bank Transfer',
      status: 'Pending',
      notes: 'Awaiting direct bank wire clearance'
    },
    {
      id: 'PAY-1007',
      memberId: 'FZ-208',
      memberName: 'Chloe Davenport',
      planName: 'Annual VIP Athlete',
      amount: 449,
      date: getDateOffset(-120),
      method: 'Credit Card',
      status: 'Paid',
      notes: 'VIP enrollment with locker allocation'
    }
  ];

  const DEFAULT_ATTENDANCE = [
    {
      id: 'ATT-301',
      memberId: 'FZ-201',
      memberName: 'Alexander Stone',
      date: getDateOffset(0),
      checkInTime: '06:45 AM',
      checkOutTime: '08:15 AM',
      status: 'Present'
    },
    {
      id: 'ATT-302',
      memberId: 'FZ-202',
      memberName: 'Sophia Miller',
      date: getDateOffset(0),
      checkInTime: '07:15 AM',
      checkOutTime: '08:30 AM',
      status: 'Present'
    },
    {
      id: 'ATT-303',
      memberId: 'FZ-204',
      memberName: 'Isabella Rodriguez',
      date: getDateOffset(0),
      checkInTime: '08:00 AM',
      checkOutTime: '09:20 AM',
      status: 'Present'
    },
    {
      id: 'ATT-304',
      memberId: 'FZ-205',
      memberName: 'Jameson Wu',
      date: getDateOffset(0),
      checkInTime: '09:30 AM',
      checkOutTime: '--',
      status: 'Present'
    },
    {
      id: 'ATT-305',
      memberId: 'FZ-206',
      memberName: 'Emma Watson-Blake',
      date: getDateOffset(0),
      checkInTime: '10:05 AM',
      checkOutTime: '--',
      status: 'Present'
    },
    {
      id: 'ATT-306',
      memberId: 'FZ-208',
      memberName: 'Chloe Davenport',
      date: getDateOffset(0),
      checkInTime: '11:15 AM',
      checkOutTime: '--',
      status: 'Present'
    },
    {
      id: 'ATT-307',
      memberId: 'FZ-201',
      memberName: 'Alexander Stone',
      date: getDateOffset(-1),
      checkInTime: '06:50 AM',
      checkOutTime: '08:10 AM',
      status: 'Present'
    },
    {
      id: 'ATT-308',
      memberId: 'FZ-203',
      memberName: 'Liam Henderson',
      date: getDateOffset(-1),
      checkInTime: '05:30 PM',
      checkOutTime: '07:00 PM',
      status: 'Late'
    }
  ];

  // =========================================================================
  // STATE STORE CONTROLLER
  // =========================================================================
  let gymData = {
    members: [],
    trainers: [],
    plans: [],
    attendance: [],
    payments: [],
    workoutPlans: []
  };

  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        gymData = JSON.parse(stored);
      } else {
        seedInitialData();
      }
    } catch (e) {
      console.error('Failed reading from LocalStorage, loading defaults.', e);
      seedInitialData();
    }
    syncMembershipStatuses();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gymData));
    } catch (e) {
      console.error('Failed writing to LocalStorage', e);
      showToast('Error', 'Unable to save data to local storage', 'error');
    }
  }

  function seedInitialData() {
    gymData = {
      members: JSON.parse(JSON.stringify(DEFAULT_MEMBERS)),
      trainers: JSON.parse(JSON.stringify(DEFAULT_TRAINERS)),
      plans: JSON.parse(JSON.stringify(DEFAULT_PLANS)),
      attendance: JSON.parse(JSON.stringify(DEFAULT_ATTENDANCE)),
      payments: JSON.parse(JSON.stringify(DEFAULT_PAYMENTS)),
      workoutPlans: JSON.parse(JSON.stringify(DEFAULT_WORKOUT_PLANS))
    };
    saveData();
  }

  // Auto-evaluate member status based on current date vs end date
  function syncMembershipStatuses() {
    const today = new Date().toISOString().split('T')[0];
    let changed = false;

    gymData.members.forEach(member => {
      if (member.status !== 'pending') {
        if (member.endDate && member.endDate < today) {
          if (member.status !== 'expired') {
            member.status = 'expired';
            changed = true;
          }
        } else if (member.status === 'expired' && member.endDate && member.endDate >= today) {
          member.status = 'active';
          changed = true;
        }
      }
    });

    if (changed) saveData();
  }

  // =========================================================================
  // UI & NAVIGATION CONTROLLER
  // =========================================================================
  let revenueChartInstance = null;
  let planChartInstance = null;

  function initApp() {
    loadData();
    setupNavigation();
    setupLiveClock();
    setupGlobalSearch();
    setupModals();
    renderAllViews();
    updateLiveBadges();

    // Default view
    switchView('dashboard');
  }

  function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const targetView = item.getAttribute('data-view');
        if (targetView) {
          switchView(targetView);
          // Auto close mobile drawer if open
          document.querySelector('.sidebar').classList.remove('mobile-open');
        }
      });
    });

    // Mobile menu drawer toggle
    const mobileTrigger = document.querySelector('.mobile-menu-trigger');
    const sidebar = document.querySelector('.sidebar');
    if (mobileTrigger) {
      mobileTrigger.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // Sidebar collapse toggle button
    const collapseBtn = document.querySelector('.sidebar-toggle-btn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

    // Direct action buttons
    document.querySelectorAll('[data-action="open-add-member"]').forEach(btn => {
      btn.addEventListener('click', () => openAddMemberModal());
    });

    document.querySelectorAll('[data-action="open-quick-checkin"]').forEach(btn => {
      btn.addEventListener('click', () => openQuickCheckInModal());
    });

    document.querySelectorAll('[data-action="reset-demo-data"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Reset all gym records back to original sample data? Custom additions will be overwritten.')) {
          seedInitialData();
          renderAllViews();
          showToast('Database Reset', 'Sample gym data loaded successfully!', 'info');
        }
      });
    });

    document.querySelectorAll('[data-action="export-backup-json"]').forEach(btn => {
      btn.addEventListener('click', exportDatabaseJson);
    });
  }

  function switchView(viewId) {
    // Update nav links
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update view panels
    document.querySelectorAll('.view-section').forEach(view => {
      if (view.id === `view-${viewId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Update header title based on active view
    const titleElem = document.querySelector('.header-title');
    const subElem = document.querySelector('.header-subtitle');
    const viewMeta = {
      dashboard: { title: 'FitZone Executive Dashboard', sub: 'Live gym telemetry, floor activity and performance overview' },
      members: { title: 'Member Directory', sub: 'Manage, search, and track all gym athletes and subscriptions' },
      memberships: { title: 'Membership Plans & Tiers', sub: 'Configure pricing, duration packages and subscriber tracking' },
      trainers: { title: 'Certified Personal Coaches', sub: 'Manage gym trainers, specializations and athlete allocations' },
      attendance: { title: 'Daily Attendance & Access Control', sub: 'Floor check-ins, check-outs, and duration tracking' },
      payments: { title: 'Financial Ledger & Invoices', sub: 'Record transactions, monitor revenue and print receipts' },
      workouts: { title: 'Custom Workout Routines', sub: 'Create tailored training schedules and assign to members' }
    };

    if (viewMeta[viewId]) {
      if (titleElem) titleElem.textContent = viewMeta[viewId].title;
      if (subElem) subElem.textContent = viewMeta[viewId].sub;
    }

    // Refresh charts if dashboard is shown
    if (viewId === 'dashboard') {
      setTimeout(renderDashboardCharts, 100);
    }
  }

  function setupLiveClock() {
    const clockElem = document.getElementById('live-clock-time');
    if (!clockElem) return;

    function update() {
      const now = new Date();
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      clockElem.textContent = now.toLocaleDateString('en-US', options);
    }

    update();
    setInterval(update, 1000);
  }

  function updateLiveBadges() {
    const totalMembers = gymData.members.length;
    const activeMembers = gymData.members.filter(m => m.status === 'active').length;
    const expiredMembers = gymData.members.filter(m => m.status === 'expired').length;
    const pendingMembers = gymData.members.filter(m => m.status === 'pending').length;

    // Badges in sidebar
    const memberBadge = document.getElementById('sidebar-member-badge');
    if (memberBadge) memberBadge.textContent = totalMembers;

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCheckins = gymData.attendance.filter(a => a.date === todayStr).length;
    const attBadge = document.getElementById('sidebar-attendance-badge');
    if (attBadge) attBadge.textContent = todayCheckins;

    const pendingPayments = gymData.payments.filter(p => p.status === 'Pending').length;
    const payBadge = document.getElementById('sidebar-payment-badge');
    if (payBadge) payBadge.textContent = pendingPayments > 0 ? pendingPayments : '';

    // Floor occupancy indicator
    const currentOnFloor = gymData.attendance.filter(a => a.date === todayStr && (a.checkOutTime === '--' || !a.checkOutTime)).length;
    const occupancyText = document.getElementById('pulse-occupancy-text');
    if (occupancyText) {
      occupancyText.textContent = `${currentOnFloor} Active on Floor`;
    }
  }

  function renderAllViews() {
    renderDashboardView();
    renderMembersView();
    renderMembershipsView();
    renderTrainersView();
    renderAttendanceView();
    renderPaymentsView();
    renderWorkoutsView();
    updateLiveBadges();
  }

  // =========================================================================
  // 1. DASHBOARD VIEW CONTROLLER
  // =========================================================================
  function renderDashboardView() {
    const totalMembers = gymData.members.length;
    const activeMembers = gymData.members.filter(m => m.status === 'active').length;
    const expiredMembers = gymData.members.filter(m => m.status === 'expired').length;

    // Monthly revenue: sum of paid transactions this current month
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const monthlyRev = gymData.payments
      .filter(p => p.status === 'Paid' && (p.date || '').startsWith(currentMonth))
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    // If month revenue is 0 (due to date offset sample), calculate all paid payments sum for preview
    const totalRevenue = gymData.payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const displayRev = monthlyRev > 0 ? monthlyRev : Math.round(totalRevenue * 0.45);

    // Today's attendance
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCheckIns = gymData.attendance.filter(a => a.date === todayStr).length;

    // Populate KPI Elements
    safeSetText('dash-total-members', totalMembers);
    safeSetText('dash-active-members', activeMembers);
    safeSetText('dash-expired-members', expiredMembers);
    safeSetText('dash-monthly-revenue', `$${displayRev.toLocaleString()}`);
    safeSetText('dash-today-attendance', todayCheckIns);

    // Recent Registrations Feed (Top 5 newest)
    const recentMembers = [...gymData.members]
      .sort((a, b) => new Date(b.joinDate || b.startDate) - new Date(a.joinDate || a.startDate))
      .slice(0, 5);

    const recentTableBody = document.getElementById('dash-recent-members-tbody');
    if (recentTableBody) {
      if (recentMembers.length === 0) {
        recentTableBody.innerHTML = `<tr><td colspan="5" class="table-empty-state">No members registered yet</td></tr>`;
      } else {
        recentTableBody.innerHTML = recentMembers.map(m => {
          const plan = gymData.plans.find(p => p.id === m.planId);
          const planName = plan ? plan.name : 'Standard';
          const trainer = gymData.trainers.find(t => t.id === m.trainerId);
          const trainerName = trainer ? trainer.name : 'Unassigned';

          return `
            <tr>
              <td>
                <div class="member-cell">
                  <div class="member-avatar">${m.avatarInitials || getInitials(m.name)}</div>
                  <div class="member-info-col">
                    <span class="member-name">${escapeHTML(m.name)}</span>
                    <span class="member-id">${m.id}</span>
                  </div>
                </div>
              </td>
              <td><span class="badge badge-plan">${escapeHTML(planName)}</span></td>
              <td>${escapeHTML(trainerName)}</td>
              <td>${formatDate(m.joinDate || m.startDate)}</td>
              <td><span class="badge badge-${m.status}">${capitalize(m.status)}</span></td>
            </tr>
          `;
        }).join('');
      }
    }

    // Live Floor Activity Feed
    const activityContainer = document.getElementById('dash-live-activity-list');
    if (activityContainer) {
      const recentAttendance = [...gymData.attendance].slice(0, 4);
      if (recentAttendance.length === 0) {
        activityContainer.innerHTML = `<div class="table-empty-state" style="padding:1rem;">No check-ins recorded yet</div>`;
      } else {
        activityContainer.innerHTML = recentAttendance.map(att => `
          <div class="activity-item">
            <div class="activity-icon-badge">
              <i class="fa-solid fa-person-walking-arrow-right"></i>
            </div>
            <div class="activity-content">
              <div class="activity-title">${escapeHTML(att.memberName)}</div>
              <div class="activity-meta">Check-in recorded • ${att.date}</div>
            </div>
            <div class="activity-time">${att.checkInTime}</div>
          </div>
        `).join('');
      }
    }
  }

  function renderDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    // 1. Revenue Trajectory Chart
    const revCanvas = document.getElementById('chart-revenue-trend');
    if (revCanvas) {
      if (revenueChartInstance) revenueChartInstance.destroy();

      const ctx = revCanvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(255, 42, 68, 0.45)');
      gradient.addColorStop(1, 'rgba(255, 42, 68, 0.0)');

      revenueChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
          datasets: [{
            label: 'Monthly Revenue ($)',
            data: [2850, 3400, 4100, 3900, 4800, 5600],
            borderColor: '#ff2a44',
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#ff2a44',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#14151c',
              titleColor: '#f8fafc',
              bodyColor: '#ff2a44',
              borderColor: '#2e3142',
              borderWidth: 1,
              padding: 10
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { color: '#94a3b8' }
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: {
                color: '#94a3b8',
                callback: val => `$${val}`
              }
            }
          }
        }
      });
    }

    // 2. Membership Distribution Doughnut Chart
    const planCanvas = document.getElementById('chart-plan-distribution');
    if (planCanvas) {
      if (planChartInstance) planChartInstance.destroy();

      const planCounts = {};
      gymData.plans.forEach(p => { planCounts[p.name] = 0; });
      gymData.members.forEach(m => {
        const found = gymData.plans.find(p => p.id === m.planId);
        if (found) planCounts[found.name] = (planCounts[found.name] || 0) + 1;
      });

      const labels = Object.keys(planCounts);
      const data = Object.values(planCounts);

      const ctx2 = planCanvas.getContext('2d');
      planChartInstance = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data.length > 0 ? data : [3, 4, 2, 1],
            backgroundColor: [
              '#ff2a44',
              '#b80d23',
              '#ff6b7e',
              '#63131e'
            ],
            borderColor: '#0e0f14',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#94a3b8',
                padding: 14,
                font: { size: 11, family: 'Plus Jakarta Sans' }
              }
            }
          },
          cutout: '68%'
        }
      });
    }
  }

  // =========================================================================
  // 2. MEMBER MANAGEMENT CONTROLLER
  // =========================================================================
  let memberSearchQuery = '';
  let memberPlanFilter = 'all';
  let memberStatusFilter = 'all';

  function renderMembersView() {
    const tableBody = document.getElementById('members-table-tbody');
    if (!tableBody) return;

    let filtered = gymData.members.filter(m => {
      // Search filter
      const q = memberSearchQuery.toLowerCase();
      const matchSearch = !q ||
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.includes(q);

      // Plan filter
      const matchPlan = memberPlanFilter === 'all' || m.planId === memberPlanFilter;

      // Status filter
      const matchStatus = memberStatusFilter === 'all' || m.status === memberStatusFilter;

      return matchSearch && matchPlan && matchStatus;
    });

    // Populate plan filter dropdown dynamically
    const planSelect = document.getElementById('filter-member-plan');
    if (planSelect && planSelect.options.length <= 1) {
      gymData.plans.forEach(plan => {
        const opt = document.createElement('option');
        opt.value = plan.id;
        opt.textContent = plan.name;
        planSelect.appendChild(opt);
      });
    }

    // Render table rows
    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="table-empty-state">
            <i class="fa-solid fa-users-slash"></i>
            <h4>No gym members found</h4>
            <p>Try clearing filters or click "+ Add Member" to register a new athlete.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(member => {
      const plan = gymData.plans.find(p => p.id === member.planId);
      const planName = plan ? plan.name : 'Standard';
      const trainer = gymData.trainers.find(t => t.id === member.trainerId);
      const trainerName = trainer ? trainer.name : 'Unassigned';

      return `
        <tr>
          <td>
            <div class="member-cell">
              <div class="member-avatar">${member.avatarInitials || getInitials(member.name)}</div>
              <div class="member-info-col">
                <span class="member-name">${escapeHTML(member.name)}</span>
                <span class="member-id">${member.id}</span>
              </div>
            </div>
          </td>
          <td>
            <div>${escapeHTML(member.email)}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(member.phone)}</div>
          </td>
          <td><span class="badge badge-plan">${escapeHTML(planName)}</span></td>
          <td>${escapeHTML(trainerName)}</td>
          <td>
            <div>${formatDate(member.startDate)}</div>
            <div style="font-size:0.75rem; color:${isExpiringSoon(member.endDate) ? 'var(--color-warning)' : 'var(--text-muted)'};">
              Exp: ${formatDate(member.endDate)}
            </div>
          </td>
          <td><span class="badge badge-${member.status}">${capitalize(member.status)}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="table-action-btn view-btn" title="View Digital Pass & Details" onclick="FitZoneApp.viewMember('${member.id}')">
                <i class="fa-solid fa-id-card"></i>
              </button>
              <button class="table-action-btn checkin-btn" title="Quick Check-In" onclick="FitZoneApp.quickCheckInMember('${member.id}')">
                <i class="fa-solid fa-user-check"></i>
              </button>
              <button class="table-action-btn edit-btn" title="Edit Member" onclick="FitZoneApp.editMember('${member.id}')">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="table-action-btn delete-btn" title="Delete Member" onclick="FitZoneApp.deleteMember('${member.id}')">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Hook search and filters
  const searchInput = document.getElementById('search-members-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      memberSearchQuery = e.target.value.trim();
      renderMembersView();
    });
  }

  const planFilterSelect = document.getElementById('filter-member-plan');
  if (planFilterSelect) {
    planFilterSelect.addEventListener('change', e => {
      memberPlanFilter = e.target.value;
      renderMembersView();
    });
  }

  const statusFilterSelect = document.getElementById('filter-member-status');
  if (statusFilterSelect) {
    statusFilterSelect.addEventListener('change', e => {
      memberStatusFilter = e.target.value;
      renderMembersView();
    });
  }

  // Export CSV button
  const exportBtn = document.getElementById('btn-export-members-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportMembersCsv);
  }

  function exportMembersCsv() {
    const headers = ['Member ID', 'Full Name', 'Email', 'Phone', 'Gender', 'Age', 'Plan', 'Start Date', 'Expiry Date', 'Status'];
    const rows = gymData.members.map(m => {
      const plan = gymData.plans.find(p => p.id === m.planId);
      return [
        m.id,
        `"${m.name}"`,
        m.email,
        `"${m.phone}"`,
        m.gender,
        m.age,
        `"${plan ? plan.name : ''}"`,
        m.startDate,
        m.endDate,
        m.status
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FitZone_Members_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export Success', 'Member directory downloaded as CSV.', 'success');
  }

  // =========================================================================
  // 3. MEMBERSHIP PLANS CONTROLLER
  // =========================================================================
  function renderMembershipsView() {
    // 1. Render plan cards
    const plansContainer = document.getElementById('plans-grid-container');
    if (plansContainer) {
      plansContainer.innerHTML = gymData.plans.map(plan => {
        const subscriberCount = gymData.members.filter(m => m.planId === plan.id && m.status === 'active').length;
        return `
          <div class="plan-card ${plan.isPopular ? 'featured' : ''}">
            ${plan.isPopular ? '<div class="plan-ribbon">POPULAR</div>' : ''}
            <div class="plan-header">
              <span class="plan-badge-duration">${plan.durationMonths} ${plan.durationMonths === 1 ? 'Month' : 'Months'} Access</span>
              <h3 class="plan-title">${escapeHTML(plan.name)}</h3>
            </div>
            <div class="plan-price-box">
              <span class="plan-currency">$</span>
              <span class="plan-amount">${plan.price}</span>
              <span class="plan-period">/ ${plan.durationMonths === 1 ? 'mo' : plan.durationMonths + ' mos'}</span>
            </div>
            <div class="plan-subscribers">
              <span>Active Athletes</span>
              <strong>${subscriberCount} Members</strong>
            </div>
            <ul class="plan-features">
              ${plan.features.map(f => `
                <li class="plan-feature-item">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>${escapeHTML(f)}</span>
                </li>
              `).join('')}
            </ul>
            <button class="btn ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}" onclick="FitZoneApp.openEnrollPlan('${plan.id}')">
              <i class="fa-solid fa-user-plus"></i> Enroll Athlete
            </button>
          </div>
        `;
      }).join('');
    }

    // 2. Render all memberships tracking table
    const overviewTable = document.getElementById('memberships-overview-tbody');
    if (overviewTable) {
      const today = new Date().toISOString().split('T')[0];
      overviewTable.innerHTML = gymData.members.map(member => {
        const plan = gymData.plans.find(p => p.id === member.planId);
        const planName = plan ? plan.name : 'Unknown';
        const daysLeft = calculateDaysRemaining(member.endDate);

        let statusText = member.status;
        let badgeClass = `badge-${member.status}`;
        if (daysLeft <= 0) {
          statusText = 'Expired';
          badgeClass = 'badge-expired';
        } else if (daysLeft <= 7) {
          statusText = 'Expiring Soon';
          badgeClass = 'badge-pending';
        }

        return `
          <tr>
            <td>
              <div class="member-cell">
                <div class="member-avatar">${member.avatarInitials || getInitials(member.name)}</div>
                <div class="member-info-col">
                  <span class="member-name">${escapeHTML(member.name)}</span>
                  <span class="member-id">${member.id}</span>
                </div>
              </div>
            </td>
            <td><span class="badge badge-plan">${escapeHTML(planName)}</span></td>
            <td>${formatDate(member.startDate)}</td>
            <td>${formatDate(member.endDate)}</td>
            <td>
              <strong style="color: ${daysLeft > 7 ? 'var(--color-success)' : daysLeft > 0 ? 'var(--color-warning)' : 'var(--color-danger)'};">
                ${daysLeft > 0 ? `${daysLeft} days` : '0 days (Expired)'}
              </strong>
            </td>
            <td><span class="badge ${badgeClass}">${statusText}</span></td>
            <td>
              <button class="btn btn-sm btn-outline-red" onclick="FitZoneApp.renewMember('${member.id}')">
                <i class="fa-solid fa-arrows-rotate"></i> Renew
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  // =========================================================================
  // 4. TRAINER MANAGEMENT CONTROLLER
  // =========================================================================
  function renderTrainersView() {
    const container = document.getElementById('trainers-grid-container');
    if (!container) return;

    if (gymData.trainers.length === 0) {
      container.innerHTML = `
        <div class="table-empty-state col-span-2" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-dumbbell"></i>
          <h4>No trainers added yet</h4>
          <p>Click "+ Add Trainer" to add your fitness coaches.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = gymData.trainers.map(trainer => {
      const assignedMembers = gymData.members.filter(m => m.trainerId === trainer.id);

      return `
        <div class="trainer-card">
          <div class="trainer-card-header">
            <div class="trainer-avatar">${trainer.avatarInitials || getInitials(trainer.name)}</div>
            <h3 class="trainer-name">${escapeHTML(trainer.name)}</h3>
            <span class="trainer-spec">${escapeHTML(trainer.specialization)}</span>
            <div class="trainer-rating">
              <i class="fa-solid fa-star"></i>
              <span>${trainer.rating} / 5.0</span>
            </div>
          </div>
          <div class="trainer-body">
            <p class="trainer-bio">${escapeHTML(trainer.bio)}</p>
            <div class="trainer-stats-row">
              <div class="trainer-stat-pill">
                <div class="trainer-stat-val">${trainer.experience}</div>
                <div class="trainer-stat-lbl">Experience</div>
              </div>
              <div class="trainer-stat-pill">
                <div class="trainer-stat-val">${assignedMembers.length}</div>
                <div class="trainer-stat-lbl">Athletes</div>
              </div>
            </div>
          </div>
          <div class="trainer-footer">
            <button class="btn btn-sm btn-secondary" onclick="FitZoneApp.viewTrainer('${trainer.id}')">
              <i class="fa-solid fa-users"></i> View Trainees
            </button>
            <div class="action-btn-group">
              <button class="table-action-btn edit-btn" title="Edit Trainer" onclick="FitZoneApp.editTrainer('${trainer.id}')">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="table-action-btn delete-btn" title="Delete Trainer" onclick="FitZoneApp.deleteTrainer('${trainer.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 5. ATTENDANCE MANAGEMENT CONTROLLER
  // =========================================================================
  let attendanceDateFilter = new Date().toISOString().split('T')[0];

  function renderAttendanceView() {
    // Populate date picker default
    const datePicker = document.getElementById('attendance-date-picker');
    if (datePicker && !datePicker.value) {
      datePicker.value = attendanceDateFilter;
    }

    // Filter attendance by chosen date
    const targetDate = (datePicker && datePicker.value) ? datePicker.value : attendanceDateFilter;
    const records = gymData.attendance.filter(a => a.date === targetDate);

    // Mini Stats
    const totalToday = records.length;
    const onFloor = records.filter(a => a.checkOutTime === '--' || !a.checkOutTime).length;
    const completed = records.filter(a => a.checkOutTime && a.checkOutTime !== '--').length;

    safeSetText('att-stat-total', totalToday);
    safeSetText('att-stat-active', onFloor);
    safeSetText('att-stat-completed', completed);

    // Table render
    const tbody = document.getElementById('attendance-table-tbody');
    if (tbody) {
      if (records.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="6" class="table-empty-state">
              <i class="fa-solid fa-calendar-xmark"></i>
              <h4>No attendance logs for ${targetDate}</h4>
              <p>Use the Quick Check-in form to log arrivals for today.</p>
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = records.map(att => {
          const isWorkingOut = !att.checkOutTime || att.checkOutTime === '--';
          return `
            <tr>
              <td>
                <strong>${escapeHTML(att.memberName)}</strong>
                <div style="font-size:0.72rem; color:var(--text-muted); font-family:monospace;">${att.memberId}</div>
              </td>
              <td>${att.date}</td>
              <td><span style="color:var(--color-success); font-weight:700;"><i class="fa-solid fa-right-to-bracket"></i> ${att.checkInTime}</span></td>
              <td>
                ${isWorkingOut
                  ? '<span class="badge badge-active"><i class="fa-solid fa-circle-dot"></i> In Gym</span>'
                  : `<span style="color:var(--text-secondary);"><i class="fa-solid fa-right-from-bracket"></i> ${att.checkOutTime}</span>`
                }
              </td>
              <td><span class="badge ${att.status === 'Present' ? 'badge-active' : 'badge-pending'}">${att.status}</span></td>
              <td>
                ${isWorkingOut
                  ? `<button class="btn btn-sm btn-outline-red" onclick="FitZoneApp.checkOutMember('${att.id}')"><i class="fa-solid fa-arrow-right-from-bracket"></i> Check Out</button>`
                  : `<span style="font-size:0.8rem; color:var(--text-muted);">Session Closed</span>`
                }
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  // Hook date picker
  const attDatePicker = document.getElementById('attendance-date-picker');
  if (attDatePicker) {
    attDatePicker.addEventListener('change', e => {
      attendanceDateFilter = e.target.value;
      renderAttendanceView();
    });
  }

  // =========================================================================
  // 6. PAYMENT MANAGEMENT CONTROLLER
  // =========================================================================
  let paymentSearchQuery = '';
  let paymentStatusFilter = 'all';

  function renderPaymentsView() {
    // Financial calculations
    const totalCollected = gymData.payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const pendingTotal = gymData.payments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const totalTransactions = gymData.payments.length;

    safeSetText('pay-stat-collected', `$${totalCollected.toLocaleString()}`);
    safeSetText('pay-stat-pending', `$${pendingTotal.toLocaleString()}`);
    safeSetText('pay-stat-total-tx', totalTransactions);

    // Table render
    const tbody = document.getElementById('payments-table-tbody');
    if (!tbody) return;

    const filtered = gymData.payments.filter(p => {
      const q = paymentSearchQuery.toLowerCase();
      const matchSearch = !q ||
        p.id.toLowerCase().includes(q) ||
        p.memberName.toLowerCase().includes(q) ||
        (p.planName || '').toLowerCase().includes(q);

      const matchStatus = paymentStatusFilter === 'all' || p.status.toLowerCase() === paymentStatusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="table-empty-state">
            <i class="fa-solid fa-receipt"></i>
            <h4>No payment transactions found</h4>
            <p>Record a payment to track membership transactions.</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(pay => {
      return `
        <tr>
          <td><strong style="font-family:monospace; color:var(--accent-red);">${pay.id}</strong></td>
          <td>
            <strong>${escapeHTML(pay.memberName)}</strong>
            <div style="font-size:0.72rem; color:var(--text-muted); font-family:monospace;">${pay.memberId}</div>
          </td>
          <td><span class="badge badge-plan">${escapeHTML(pay.planName || 'Gym Pass')}</span></td>
          <td><strong style="font-size:1.05rem; color:var(--text-light);">$${pay.amount}</strong></td>
          <td>${formatDate(pay.date)}</td>
          <td>${escapeHTML(pay.method)}</td>
          <td>
            <span class="badge ${pay.status === 'Paid' ? 'badge-active' : 'badge-pending'}">
              ${pay.status}
            </span>
          </td>
          <td>
            <div class="action-btn-group">
              <button class="table-action-btn view-btn" title="View & Print Invoice Receipt" onclick="FitZoneApp.viewReceipt('${pay.id}')">
                <i class="fa-solid fa-print"></i>
              </button>
              ${pay.status === 'Pending' ? `
                <button class="table-action-btn checkin-btn" title="Mark as Paid" onclick="FitZoneApp.markPaymentPaid('${pay.id}')">
                  <i class="fa-solid fa-circle-check"></i>
                </button>
              ` : ''}
              <button class="table-action-btn delete-btn" title="Delete Record" onclick="FitZoneApp.deletePayment('${pay.id}')">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Hook payments search & filter
  const paySearchInput = document.getElementById('search-payments-input');
  if (paySearchInput) {
    paySearchInput.addEventListener('input', e => {
      paymentSearchQuery = e.target.value.trim();
      renderPaymentsView();
    });
  }

  const payStatusSelect = document.getElementById('filter-payments-status');
  if (payStatusSelect) {
    payStatusSelect.addEventListener('change', e => {
      paymentStatusFilter = e.target.value;
      renderPaymentsView();
    });
  }

  // =========================================================================
  // 7. WORKOUT PLANS CONTROLLER
  // =========================================================================
  function renderWorkoutsView() {
    const container = document.getElementById('workouts-grid-container');
    if (!container) return;

    if (gymData.workoutPlans.length === 0) {
      container.innerHTML = `
        <div class="table-empty-state col-span-2" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-dumbbell"></i>
          <h4>No custom workout plans created</h4>
          <p>Click "+ Create Workout Plan" to author routine splits for your athletes.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = gymData.workoutPlans.map(wp => {
      const assignedCount = gymData.members.filter(m => m.workoutPlanId === wp.id).length;
      return `
        <div class="workout-card">
          <div class="workout-card-header">
            <div>
              <h3 class="workout-card-title">${escapeHTML(wp.name)}</h3>
              <div class="workout-meta-tags">
                <span class="workout-tag goal"><i class="fa-solid fa-bullseye"></i> ${escapeHTML(wp.goal)}</span>
                <span class="workout-tag"><i class="fa-solid fa-gauge-high"></i> ${escapeHTML(wp.difficulty)}</span>
                <span class="workout-tag"><i class="fa-solid fa-clock"></i> ${escapeHTML(wp.duration)}</span>
              </div>
            </div>
            <span class="badge badge-plan">${assignedCount} Athletes</span>
          </div>
          <div class="workout-body">
            <div class="workout-schedule-preview">
              ${(wp.schedule || []).slice(0, 3).map(item => `
                <div class="schedule-day-row">
                  <span class="schedule-day-badge">${escapeHTML(item.day)}</span>
                  <div class="schedule-day-desc">
                    <strong style="color:var(--text-light);">${escapeHTML(item.focus)}</strong>: ${escapeHTML(item.exercises)}
                  </div>
                </div>
              `).join('')}
              ${wp.schedule && wp.schedule.length > 3 ? `
                <div style="font-size:0.75rem; color:var(--text-muted); text-align:center; padding-top:0.25rem;">
                  + ${wp.schedule.length - 3} more training days scheduled
                </div>
              ` : ''}
            </div>
          </div>
          <div class="workout-card-footer">
            <button class="btn btn-sm btn-outline-red" onclick="FitZoneApp.assignWorkoutModal('${wp.id}')">
              <i class="fa-solid fa-user-tag"></i> Assign to Member
            </button>
            <div class="action-btn-group">
              <button class="table-action-btn view-btn" title="View Full Plan" onclick="FitZoneApp.viewWorkoutPlan('${wp.id}')">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="table-action-btn delete-btn" title="Delete Plan" onclick="FitZoneApp.deleteWorkoutPlan('${wp.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // MODALS & CRUD OPERATIONS
  // =========================================================================
  function setupModals() {
    // Backdrop clicks to close modal
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) {
          closeAllModals();
        }
      });
    });

    // Close buttons
    document.querySelectorAll('.modal-close-btn, [data-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeAllModals();
      });
    });

    // Hook forms
    setupMemberForm();
    setupTrainerForm();
    setupPaymentForm();
    setupWorkoutForm();
    setupQuickCheckinForm();
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  // -------------------------------------------------------------------------
  // Member Add / Edit Modal & Actions
  // -------------------------------------------------------------------------
  let editingMemberId = null;

  function populateMemberFormDropdowns(selectedPlanId, selectedTrainerId, selectedWorkoutId) {
    const planSelect = document.getElementById('member-form-plan');
    if (planSelect) {
      planSelect.innerHTML = gymData.plans.map(p => `
        <option value="${p.id}" ${p.id === selectedPlanId ? 'selected' : ''}>${escapeHTML(p.name)} - $${p.price} (${p.durationMonths} Mo)</option>
      `).join('');
    }

    const trainerSelect = document.getElementById('member-form-trainer');
    if (trainerSelect) {
      trainerSelect.innerHTML = `<option value="">Unassigned</option>` + gymData.trainers.map(t => `
        <option value="${t.id}" ${t.id === selectedTrainerId ? 'selected' : ''}>${escapeHTML(t.name)} (${escapeHTML(t.specialization)})</option>
      `).join('');
    }

    const workoutSelect = document.getElementById('member-form-workout');
    if (workoutSelect) {
      workoutSelect.innerHTML = `<option value="">None / Custom Routine</option>` + gymData.workoutPlans.map(w => `
        <option value="${w.id}" ${w.id === selectedWorkoutId ? 'selected' : ''}>${escapeHTML(w.name)} (${escapeHTML(w.goal)})</option>
      `).join('');
    }
  }

  function openAddMemberModal() {
    editingMemberId = null;
    safeSetText('member-modal-title-text', 'Register New Gym Member');
    const form = document.getElementById('member-form');
    if (form) form.reset();

    populateMemberFormDropdowns();

    // Default start date = today
    const startElem = document.getElementById('member-form-start');
    if (startElem) startElem.value = new Date().toISOString().split('T')[0];

    openModal('modal-member-form');
  }

  function editMember(memberId) {
    const member = gymData.members.find(m => m.id === memberId);
    if (!member) return;

    editingMemberId = memberId;
    safeSetText('member-modal-title-text', `Edit Member Profile (${member.id})`);

    safeSetValue('member-form-name', member.name);
    safeSetValue('member-form-email', member.email);
    safeSetValue('member-form-phone', member.phone);
    safeSetValue('member-form-gender', member.gender || 'Male');
    safeSetValue('member-form-age', member.age || 25);
    safeSetValue('member-form-emergency', member.emergencyContact || '');
    safeSetValue('member-form-start', member.startDate || '');
    safeSetValue('member-form-status', member.status || 'active');

    populateMemberFormDropdowns(member.planId, member.trainerId, member.workoutPlanId);

    openModal('modal-member-form');
  }

  function setupMemberForm() {
    const form = document.getElementById('member-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('member-form-name').value.trim();
      const email = document.getElementById('member-form-email').value.trim();
      const phone = document.getElementById('member-form-phone').value.trim();
      const gender = document.getElementById('member-form-gender').value;
      const age = parseInt(document.getElementById('member-form-age').value, 10) || 25;
      const emergency = document.getElementById('member-form-emergency').value.trim();
      const planId = document.getElementById('member-form-plan').value;
      const trainerId = document.getElementById('member-form-trainer').value;
      const workoutPlanId = document.getElementById('member-form-workout').value;
      const startDate = document.getElementById('member-form-start').value;
      const status = document.getElementById('member-form-status').value;

      if (!name || !email || !phone || !startDate) {
        showToast('Validation Error', 'Please complete all required fields.', 'warning');
        return;
      }

      // Compute end date based on plan duration
      const selectedPlan = gymData.plans.find(p => p.id === planId);
      const durationMonths = selectedPlan ? selectedPlan.durationMonths : 1;
      const endDate = calculateEndDate(startDate, durationMonths);

      if (editingMemberId) {
        // Edit existing
        const idx = gymData.members.findIndex(m => m.id === editingMemberId);
        if (idx !== -1) {
          gymData.members[idx] = {
            ...gymData.members[idx],
            name,
            email,
            phone,
            gender,
            age,
            emergencyContact: emergency,
            planId,
            trainerId,
            workoutPlanId,
            startDate,
            endDate,
            status,
            avatarInitials: getInitials(name)
          };
          saveData();
          renderAllViews();
          closeAllModals();
          showToast('Updated', `Member ${name} profile saved.`, 'success');
        }
      } else {
        // Add new
        const newId = `FZ-${Math.floor(100 + Math.random() * 900)}`;
        const newMember = {
          id: newId,
          name,
          email,
          phone,
          gender,
          age,
          emergencyContact: emergency,
          planId,
          trainerId,
          workoutPlanId,
          startDate,
          endDate,
          status,
          joinDate: startDate,
          avatarInitials: getInitials(name)
        };

        // Also automatically generate invoice payment record
        if (selectedPlan) {
          const newPayment = {
            id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
            memberId: newId,
            memberName: name,
            planName: selectedPlan.name,
            amount: selectedPlan.price,
            date: startDate,
            method: 'Credit Card',
            status: 'Paid',
            notes: 'Initial registration payment'
          };
          gymData.payments.unshift(newPayment);
        }

        gymData.members.unshift(newMember);
        saveData();
        renderAllViews();
        closeAllModals();
        showToast('Member Enrolled', `Welcome ${name}! ID: ${newId}`, 'success');
      }
    });
  }

  function deleteMember(memberId) {
    const member = gymData.members.find(m => m.id === memberId);
    if (!member) return;

    if (confirm(`Are you sure you want to delete member ${member.name} (${member.id})? All associated records will be removed.`)) {
      gymData.members = gymData.members.filter(m => m.id !== memberId);
      // Clean up attendance & payments
      gymData.attendance = gymData.attendance.filter(a => a.memberId !== memberId);
      gymData.payments = gymData.payments.filter(p => p.memberId !== memberId);
      saveData();
      renderAllViews();
      showToast('Deleted', `Member ${member.name} has been removed.`, 'info');
    }
  }

  function renewMember(memberId) {
    const member = gymData.members.find(m => m.id === memberId);
    if (!member) return;

    const plan = gymData.plans.find(p => p.id === member.planId);
    const durationMonths = plan ? plan.durationMonths : 1;
    const price = plan ? plan.price : 49;

    const today = new Date().toISOString().split('T')[0];
    const newStart = (member.endDate && member.endDate > today) ? member.endDate : today;
    const newEnd = calculateEndDate(newStart, durationMonths);

    member.startDate = newStart;
    member.endDate = newEnd;
    member.status = 'active';

    // Record renewal payment
    gymData.payments.unshift({
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: member.id,
      memberName: member.name,
      planName: plan ? plan.name : 'Membership Renewal',
      amount: price,
      date: today,
      method: 'Credit Card',
      status: 'Paid',
      notes: `Membership renewed for +${durationMonths} month(s)`
    });

    saveData();
    renderAllViews();
    showToast('Renewed!', `${member.name}'s pass extended until ${newEnd}`, 'success');
  }

  function viewMember(memberId) {
    const member = gymData.members.find(m => m.id === memberId);
    if (!member) return;

    const plan = gymData.plans.find(p => p.id === member.planId);
    const trainer = gymData.trainers.find(t => t.id === member.trainerId);
    const workout = gymData.workoutPlans.find(w => w.id === member.workoutPlanId);
    const payments = gymData.payments.filter(p => p.memberId === member.id);
    const attendances = gymData.attendance.filter(a => a.memberId === member.id);

    // Populate VIP card
    safeSetText('vip-card-name', member.name);
    safeSetText('vip-card-id', member.id);
    safeSetText('vip-card-plan', plan ? plan.name : 'General Access');
    safeSetText('vip-card-validity', `${formatDate(member.startDate)} to ${formatDate(member.endDate)}`);
    safeSetText('vip-card-emergency', member.emergencyContact || 'None on file');
    safeSetText('vip-card-trainer', trainer ? trainer.name : 'Unassigned');
    safeSetText('vip-card-avatar', member.avatarInitials || getInitials(member.name));

    const statusBadge = document.getElementById('vip-card-status-badge');
    if (statusBadge) {
      statusBadge.className = `badge badge-${member.status}`;
      statusBadge.textContent = capitalize(member.status);
    }

    // Populate workout section
    const workoutBox = document.getElementById('vip-member-workout-details');
    if (workoutBox) {
      if (workout) {
        workoutBox.innerHTML = `
          <div style="background:var(--bg-surface); padding:1rem; border-radius:var(--border-radius-md); border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <strong style="color:var(--text-light); font-size:1.05rem;">${escapeHTML(workout.name)}</strong>
              <span class="badge badge-plan">${escapeHTML(workout.goal)}</span>
            </div>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.5rem;">
              <strong>Difficulty:</strong> ${workout.difficulty} | <strong>Duration:</strong> ${workout.duration}
            </p>
            <div style="font-size:0.78rem; color:var(--text-muted);">
              ${(workout.schedule || []).map(s => `<div><strong style="color:var(--accent-red);">${s.day}:</strong> ${s.focus} (${s.exercises})</div>`).join('')}
            </div>
          </div>
        `;
      } else {
        workoutBox.innerHTML = `
          <div style="color:var(--text-muted); font-size:0.85rem; padding:0.5rem 0;">
            No workout plan assigned. <a href="javascript:void(0)" onclick="FitZoneApp.editMember('${member.id}')" style="color:var(--accent-red); text-decoration:underline;">Assign a routine split now</a>.
          </div>
        `;
      }
    }

    // Populate recent member payment logs
    const payList = document.getElementById('vip-member-payment-logs');
    if (payList) {
      if (payments.length === 0) {
        payList.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem;">No payment transactions recorded.</div>`;
      } else {
        payList.innerHTML = payments.map(p => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--border-subtle); font-size:0.85rem;">
            <div>
              <span style="font-family:monospace; color:var(--accent-red); font-weight:700;">${p.id}</span>
              <span style="color:var(--text-secondary); margin-left:0.5rem;">${p.planName}</span>
            </div>
            <div>
              <strong style="color:var(--text-light); margin-right:0.5rem;">$${p.amount}</strong>
              <span class="badge ${p.status === 'Paid' ? 'badge-active' : 'badge-pending'}">${p.status}</span>
            </div>
          </div>
        `).join('');
      }
    }

    openModal('modal-member-view');
  }

  // -------------------------------------------------------------------------
  // Trainer Add / Edit Modal & Actions
  // -------------------------------------------------------------------------
  let editingTrainerId = null;

  function openAddTrainerModal() {
    editingTrainerId = null;
    safeSetText('trainer-modal-title-text', 'Add New Fitness Coach');
    const form = document.getElementById('trainer-form');
    if (form) form.reset();
    openModal('modal-trainer-form');
  }

  function editTrainer(trainerId) {
    const trainer = gymData.trainers.find(t => t.id === trainerId);
    if (!trainer) return;

    editingTrainerId = trainerId;
    safeSetText('trainer-modal-title-text', `Edit Coach Profile (${trainer.name})`);

    safeSetValue('trainer-form-name', trainer.name);
    safeSetValue('trainer-form-spec', trainer.specialization);
    safeSetValue('trainer-form-exp', trainer.experience);
    safeSetValue('trainer-form-phone', trainer.phone);
    safeSetValue('trainer-form-email', trainer.email);
    safeSetValue('trainer-form-rating', trainer.rating || 4.9);
    safeSetValue('trainer-form-bio', trainer.bio || '');

    openModal('modal-trainer-form');
  }

  function setupTrainerForm() {
    const form = document.getElementById('trainer-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('trainer-form-name').value.trim();
      const specialization = document.getElementById('trainer-form-spec').value.trim();
      const experience = document.getElementById('trainer-form-exp').value.trim();
      const phone = document.getElementById('trainer-form-phone').value.trim();
      const email = document.getElementById('trainer-form-email').value.trim();
      const rating = parseFloat(document.getElementById('trainer-form-rating').value) || 4.9;
      const bio = document.getElementById('trainer-form-bio').value.trim();

      if (!name || !specialization || !phone) {
        showToast('Validation', 'Please provide coach name, specialization and phone number.', 'warning');
        return;
      }

      if (editingTrainerId) {
        const idx = gymData.trainers.findIndex(t => t.id === editingTrainerId);
        if (idx !== -1) {
          gymData.trainers[idx] = {
            ...gymData.trainers[idx],
            name,
            specialization,
            experience,
            phone,
            email,
            rating,
            bio,
            avatarInitials: getInitials(name)
          };
          saveData();
          renderTrainersView();
          closeAllModals();
          showToast('Updated', `Coach ${name} profile saved.`, 'success');
        }
      } else {
        const newId = `TR-${Math.floor(100 + Math.random() * 900)}`;
        gymData.trainers.push({
          id: newId,
          name,
          specialization,
          experience,
          phone,
          email,
          rating,
          bio,
          avatarInitials: getInitials(name)
        });
        saveData();
        renderTrainersView();
        closeAllModals();
        showToast('Coach Added', `Welcome coach ${name}!`, 'success');
      }
    });
  }

  function deleteTrainer(trainerId) {
    const trainer = gymData.trainers.find(t => t.id === trainerId);
    if (!trainer) return;

    if (confirm(`Remove trainer ${trainer.name}? Assigned members will be unassigned.`)) {
      gymData.trainers = gymData.trainers.filter(t => t.id !== trainerId);
      // Unassign from members
      gymData.members.forEach(m => {
        if (m.trainerId === trainerId) m.trainerId = '';
      });
      saveData();
      renderAllViews();
      showToast('Removed', `Trainer ${trainer.name} deleted.`, 'info');
    }
  }

  function viewTrainer(trainerId) {
    const trainer = gymData.trainers.find(t => t.id === trainerId);
    if (!trainer) return;

    safeSetText('view-trainer-modal-name', trainer.name);
    safeSetText('view-trainer-modal-spec', trainer.specialization);
    safeSetText('view-trainer-modal-bio', trainer.bio);

    const traineesList = gymData.members.filter(m => m.trainerId === trainer.id);
    const traineesContainer = document.getElementById('view-trainer-modal-trainees');

    if (traineesContainer) {
      if (traineesList.length === 0) {
        traineesContainer.innerHTML = `<div class="table-empty-state" style="padding:1.5rem;">No members currently assigned to this coach.</div>`;
      } else {
        traineesContainer.innerHTML = traineesList.map(m => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.75rem; background:var(--bg-card); border-radius:var(--border-radius-md); margin-bottom:0.5rem; border:1px solid var(--border-subtle);">
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <div class="member-avatar" style="width:30px; height:30px; font-size:0.75rem;">${m.avatarInitials}</div>
              <div>
                <strong style="color:var(--text-light); font-size:0.85rem;">${escapeHTML(m.name)}</strong>
                <div style="font-size:0.72rem; color:var(--text-muted);">${m.id}</div>
              </div>
            </div>
            <span class="badge badge-${m.status}">${capitalize(m.status)}</span>
          </div>
        `).join('');
      }
    }

    openModal('modal-trainer-view');
  }

  // -------------------------------------------------------------------------
  // Quick Check-in & Attendance Modal Actions
  // -------------------------------------------------------------------------
  function openQuickCheckInModal(prefillMemberId) {
    const select = document.getElementById('quick-checkin-member-select');
    if (select) {
      select.innerHTML = `<option value="">-- Choose Gym Athlete --</option>` + gymData.members.map(m => `
        <option value="${m.id}" ${m.id === prefillMemberId ? 'selected' : ''}>
          ${escapeHTML(m.name)} (${m.id}) - ${capitalize(m.status)}
        </option>
      `).join('');
    }

    const timeElem = document.getElementById('quick-checkin-time');
    if (timeElem) {
      const d = new Date();
      timeElem.value = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    const dateElem = document.getElementById('quick-checkin-date');
    if (dateElem) {
      dateElem.value = new Date().toISOString().split('T')[0];
    }

    openModal('modal-quick-checkin');
  }

  function setupQuickCheckinForm() {
    const form = document.getElementById('quick-checkin-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const memberId = document.getElementById('quick-checkin-member-select').value;
      const date = document.getElementById('quick-checkin-date').value;
      const time = document.getElementById('quick-checkin-time').value;
      const status = document.getElementById('quick-checkin-status').value || 'Present';

      if (!memberId) {
        showToast('Required', 'Please select a member to check in.', 'warning');
        return;
      }

      const member = gymData.members.find(m => m.id === memberId);
      if (!member) return;

      if (member.status === 'expired') {
        if (!confirm(`Warning: ${member.name}'s membership has EXPIRED. Check in anyway?`)) {
          return;
        }
      }

      const newAtt = {
        id: `ATT-${Math.floor(100 + Math.random() * 900)}`,
        memberId: member.id,
        memberName: member.name,
        date: date || new Date().toISOString().split('T')[0],
        checkInTime: time || '08:00 AM',
        checkOutTime: '--',
        status: status
      };

      gymData.attendance.unshift(newAtt);
      saveData();
      renderAttendanceView();
      renderDashboardView();
      updateLiveBadges();
      closeAllModals();

      showToast('Checked In! 🏋️‍♂️', `${member.name} checked into the floor at ${newAtt.checkInTime}`, 'success');
    });
  }

  function quickCheckInMember(memberId) {
    openQuickCheckInModal(memberId);
  }

  function checkOutMember(attendanceId) {
    const att = gymData.attendance.find(a => a.id === attendanceId);
    if (!att) return;

    const now = new Date();
    att.checkOutTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    saveData();
    renderAttendanceView();
    renderDashboardView();
    updateLiveBadges();
    showToast('Checked Out', `${att.memberName} completed workout at ${att.checkOutTime}`, 'info');
  }

  // -------------------------------------------------------------------------
  // Payment Modal & Invoicing Actions
  // -------------------------------------------------------------------------
  function openRecordPaymentModal() {
    const form = document.getElementById('payment-form');
    if (form) form.reset();

    const memberSelect = document.getElementById('pay-form-member');
    if (memberSelect) {
      memberSelect.innerHTML = `<option value="">-- Choose Member --</option>` + gymData.members.map(m => `
        <option value="${m.id}">${escapeHTML(m.name)} (${m.id})</option>
      `).join('');
    }

    const planSelect = document.getElementById('pay-form-plan');
    if (planSelect) {
      planSelect.innerHTML = gymData.plans.map(p => `
        <option value="${p.name}" data-price="${p.price}">${escapeHTML(p.name)} ($${p.price})</option>
      `).join('');

      planSelect.addEventListener('change', () => {
        const selected = planSelect.options[planSelect.selectedIndex];
        const price = selected.getAttribute('data-price');
        if (price) safeSetValue('pay-form-amount', price);
      });
    }

    const dateElem = document.getElementById('pay-form-date');
    if (dateElem) dateElem.value = new Date().toISOString().split('T')[0];

    // Auto set default amount from first plan
    if (gymData.plans.length > 0) {
      safeSetValue('pay-form-amount', gymData.plans[0].price);
    }

    openModal('modal-payment-form');
  }

  function setupPaymentForm() {
    const form = document.getElementById('payment-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const memberId = document.getElementById('pay-form-member').value;
      const planName = document.getElementById('pay-form-plan').value;
      const amount = parseFloat(document.getElementById('pay-form-amount').value) || 0;
      const date = document.getElementById('pay-form-date').value;
      const method = document.getElementById('pay-form-method').value;
      const status = document.getElementById('pay-form-status').value;
      const notes = document.getElementById('pay-form-notes').value.trim();

      if (!memberId || !amount) {
        showToast('Required', 'Please select a member and enter payment amount.', 'warning');
        return;
      }

      const member = gymData.members.find(m => m.id === memberId);
      const newPayId = `PAY-${Math.floor(1000 + Math.random() * 9000)}`;

      const newPayment = {
        id: newPayId,
        memberId,
        memberName: member ? member.name : 'Unknown Member',
        planName,
        amount,
        date: date || new Date().toISOString().split('T')[0],
        method,
        status,
        notes: notes || 'Front desk transaction'
      };

      gymData.payments.unshift(newPayment);
      saveData();
      renderPaymentsView();
      renderDashboardView();
      updateLiveBadges();
      closeAllModals();

      showToast('Payment Logged', `Recorded $${amount} for ${newPayment.memberName}.`, 'success');
    });
  }

  function markPaymentPaid(paymentId) {
    const payment = gymData.payments.find(p => p.id === paymentId);
    if (!payment) return;

    payment.status = 'Paid';
    saveData();
    renderPaymentsView();
    renderDashboardView();
    updateLiveBadges();
    showToast('Paid Status', `Payment ${payment.id} marked as Paid.`, 'success');
  }

  function deletePayment(paymentId) {
    if (confirm('Delete this payment transaction record?')) {
      gymData.payments = gymData.payments.filter(p => p.id !== paymentId);
      saveData();
      renderPaymentsView();
      renderDashboardView();
      updateLiveBadges();
      showToast('Deleted', `Transaction ${paymentId} removed.`, 'info');
    }
  }

  function viewReceipt(paymentId) {
    const payment = gymData.payments.find(p => p.id === paymentId);
    if (!payment) return;

    const member = gymData.members.find(m => m.id === payment.memberId);

    safeSetText('receipt-tx-id', payment.id);
    safeSetText('receipt-date', formatDate(payment.date));
    safeSetText('receipt-member-name', payment.memberName);
    safeSetText('receipt-member-id', payment.memberId);
    safeSetText('receipt-member-email', member ? member.email : 'N/A');
    safeSetText('receipt-item-desc', payment.planName || 'Gym Membership Pass');
    safeSetText('receipt-amount', `$${payment.amount}.00`);
    safeSetText('receipt-total', `$${payment.amount}.00`);
    safeSetText('receipt-method', payment.method);
    safeSetText('receipt-status', payment.status);

    openModal('modal-receipt-view');
  }

  // -------------------------------------------------------------------------
  // Workout Plans Modal & Assignment
  // -------------------------------------------------------------------------
  function openCreateWorkoutModal() {
    const form = document.getElementById('workout-form');
    if (form) form.reset();
    openModal('modal-workout-form');
  }

  function setupWorkoutForm() {
    const form = document.getElementById('workout-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('wp-form-name').value.trim();
      const goal = document.getElementById('wp-form-goal').value.trim();
      const difficulty = document.getElementById('wp-form-diff').value;
      const duration = document.getElementById('wp-form-duration').value.trim();
      const mon = document.getElementById('wp-form-mon').value.trim();
      const tue = document.getElementById('wp-form-tue').value.trim();
      const wed = document.getElementById('wp-form-wed').value.trim();
      const thu = document.getElementById('wp-form-thu').value.trim();
      const fri = document.getElementById('wp-form-fri').value.trim();
      const sat = document.getElementById('wp-form-sat').value.trim();

      if (!name || !goal) {
        showToast('Required', 'Please enter a plan name and primary goal.', 'warning');
        return;
      }

      const schedule = [];
      if (mon) schedule.push({ day: 'Monday', focus: 'Push / Chest', exercises: mon });
      if (tue) schedule.push({ day: 'Tuesday', focus: 'Pull / Back', exercises: tue });
      if (wed) schedule.push({ day: 'Wednesday', focus: 'Recovery / Legs', exercises: wed });
      if (thu) schedule.push({ day: 'Thursday', focus: 'Shoulders / Arms', exercises: thu });
      if (fri) schedule.push({ day: 'Friday', focus: 'Legs / Calves', exercises: fri });
      if (sat) schedule.push({ day: 'Saturday', focus: 'Conditioning / HIIT', exercises: sat });

      const newPlan = {
        id: `WP-${Math.floor(100 + Math.random() * 900)}`,
        name,
        goal,
        difficulty: difficulty || 'Intermediate',
        duration: duration || '8 Weeks',
        schedule
      };

      gymData.workoutPlans.unshift(newPlan);
      saveData();
      renderWorkoutsView();
      closeAllModals();

      showToast('Routine Created', `Workout routine "${name}" is now ready to assign!`, 'success');
    });
  }

  let assigningWorkoutId = null;

  function assignWorkoutModal(workoutId) {
    assigningWorkoutId = workoutId;
    const plan = gymData.workoutPlans.find(w => w.id === workoutId);
    if (!plan) return;

    safeSetText('assign-workout-title', `Assign "${plan.name}" to Athlete`);

    const select = document.getElementById('assign-workout-member-select');
    if (select) {
      select.innerHTML = `<option value="">-- Choose Gym Member --</option>` + gymData.members.map(m => `
        <option value="${m.id}">${escapeHTML(m.name)} (${m.id})</option>
      `).join('');
    }

    openModal('modal-assign-workout');
  }

  const assignWorkoutBtn = document.getElementById('btn-confirm-assign-workout');
  if (assignWorkoutBtn) {
    assignWorkoutBtn.addEventListener('click', () => {
      const select = document.getElementById('assign-workout-member-select');
      const memberId = select ? select.value : null;

      if (!memberId || !assigningWorkoutId) {
        showToast('Selection Required', 'Please pick a member.', 'warning');
        return;
      }

      const member = gymData.members.find(m => m.id === memberId);
      const plan = gymData.workoutPlans.find(w => w.id === assigningWorkoutId);

      if (member && plan) {
        member.workoutPlanId = plan.id;
        saveData();
        renderWorkoutsView();
        renderMembersView();
        closeAllModals();
        showToast('Assigned!', `Assigned "${plan.name}" to ${member.name}.`, 'success');
      }
    });
  }

  function viewWorkoutPlan(workoutId) {
    const plan = gymData.workoutPlans.find(w => w.id === workoutId);
    if (!plan) return;

    safeSetText('view-workout-name', plan.name);
    safeSetText('view-workout-goal', plan.goal);
    safeSetText('view-workout-diff', plan.difficulty);
    safeSetText('view-workout-duration', plan.duration);

    const scheduleBox = document.getElementById('view-workout-schedule-list');
    if (scheduleBox) {
      scheduleBox.innerHTML = (plan.schedule || []).map(s => `
        <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--border-radius-md); padding:0.85rem; margin-bottom:0.75rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
            <strong style="color:var(--accent-red); text-transform:uppercase;">${escapeHTML(s.day)}</strong>
            <span style="font-weight:700; color:var(--text-light);">${escapeHTML(s.focus)}</span>
          </div>
          <div style="font-size:0.85rem; color:var(--text-secondary); line-height:1.4;">${escapeHTML(s.exercises)}</div>
        </div>
      `).join('');
    }

    openModal('modal-workout-view');
  }

  function deleteWorkoutPlan(workoutId) {
    const plan = gymData.workoutPlans.find(w => w.id === workoutId);
    if (!plan) return;

    if (confirm(`Delete workout routine "${plan.name}"?`)) {
      gymData.workoutPlans = gymData.workoutPlans.filter(w => w.id !== workoutId);
      gymData.members.forEach(m => {
        if (m.workoutPlanId === workoutId) m.workoutPlanId = '';
      });
      saveData();
      renderWorkoutsView();
      renderMembersView();
      showToast('Deleted', `Workout routine "${plan.name}" removed.`, 'info');
    }
  }

  // -------------------------------------------------------------------------
  // Global Search Navigation
  // -------------------------------------------------------------------------
  function setupGlobalSearch() {
    const globalInput = document.getElementById('global-search-input');
    if (!globalInput) return;

    globalInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = globalInput.value.trim();
        if (!val) return;

        // Switch to members view and filter
        switchView('members');
        memberSearchQuery = val;
        const memberInput = document.getElementById('search-members-input');
        if (memberInput) memberInput.value = val;
        renderMembersView();
      }
    });
  }

  function exportDatabaseJson() {
    const jsonStr = JSON.stringify(gymData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FitZone_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Backup Created', 'Complete database JSON file exported.', 'success');
  }

  // =========================================================================
  // TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;

    const icons = {
      success: 'fa-solid fa-circle-check',
      error: 'fa-solid fa-triangle-exclamation',
      warning: 'fa-solid fa-circle-exclamation',
      info: 'fa-solid fa-circle-info'
    };

    toast.innerHTML = `
      <div class="toast-icon">
        <i class="${icons[type] || icons.info}"></i>
      </div>
      <div class="toast-text">
        <div class="toast-title">${escapeHTML(title)}</div>
        <div class="toast-desc">${escapeHTML(message)}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // =========================================================================
  // HELPER FORMATTING UTILITIES
  // =========================================================================
  function safeSetText(elemId, text) {
    const el = document.getElementById(elemId);
    if (el) el.textContent = text;
  }

  function safeSetValue(elemId, val) {
    const el = document.getElementById(elemId);
    if (el) el.value = val;
  }

  function getInitials(name) {
    if (!name) return 'FZ';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function formatDate(dateStr) {
    if (!dateStr) return '--';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function calculateEndDate(startDateStr, months) {
    const d = new Date(startDateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return startDateStr;
    d.setMonth(d.getMonth() + Number(months));
    return d.toISOString().split('T')[0];
  }

  function calculateDaysRemaining(endDateStr) {
    if (!endDateStr) return 0;
    const end = new Date(endDateStr + 'T00:00:00');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diffTime = end - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function isExpiringSoon(endDateStr) {
    const days = calculateDaysRemaining(endDateStr);
    return days > 0 && days <= 7;
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // PUBLIC EXPOSURE FOR DOM INLINE EVENT HANDLERS
  // =========================================================================
  window.FitZoneApp = {
    switchView,
    openAddMemberModal,
    editMember,
    deleteMember,
    viewMember,
    renewMember,
    quickCheckInMember,
    checkOutMember,
    openQuickCheckInModal,
    openAddTrainerModal,
    editTrainer,
    deleteTrainer,
    viewTrainer,
    openRecordPaymentModal,
    viewReceipt,
    markPaymentPaid,
    deletePayment,
    openCreateWorkoutModal,
    viewWorkoutPlan,
    deleteWorkoutPlan,
    assignWorkoutModal,
    openEnrollPlan: function (planId) {
      openAddMemberModal();
      safeSetValue('member-form-plan', planId);
    },
    printArea: function (elementId) {
      window.print();
    }
  };

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
