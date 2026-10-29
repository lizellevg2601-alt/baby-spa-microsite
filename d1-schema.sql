-- Waitlist entries for Twinkle Toe Love Baby Wellness Spa
CREATE TABLE IF NOT EXISTS WaitlistEntry (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL UNIQUE,
  marketingConsent INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON WaitlistEntry(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON WaitlistEntry(createdAt);

-- Config table for feature flags
CREATE TABLE IF NOT EXISTS Config (
  id TEXT PRIMARY KEY DEFAULT 'config',
  bookingsEnabled INTEGER NOT NULL DEFAULT 0,
  paymentsMode TEXT NOT NULL DEFAULT 'test',
  holdMinutes INTEGER NOT NULL DEFAULT 25,
  currency TEXT NOT NULL DEFAULT 'gbp',
  timezone TEXT NOT NULL DEFAULT 'Europe/London',
  siteTitle TEXT NOT NULL DEFAULT 'Twinkle Toe Love – Baby Wellness Spa',
  siteTagline TEXT NOT NULL DEFAULT 'Little wonders. Big discoveries.',
  venueStatus TEXT NOT NULL DEFAULT 'coming-soon',
  venueNotice TEXT DEFAULT 'Coming to Nottingham / West Bridgford — venue to be confirmed.',
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Insert default config (bookings disabled by default)
INSERT OR IGNORE INTO Config (id, bookingsEnabled, paymentsMode) VALUES ('config', 0, 'test');
