---
number: "001"
title: "App Lock promises content won't show in other apps. Here are three places it does."
dek: "iOS lets you lock an app behind Face ID. The setting screen says the lock also covers content surfaced elsewhere on the system. Three shipping surfaces reach that content with no authentication at all."
published: 2026-07-30
status: unresolved
statusNote: "Closed by vendor"
affected: "iOS 26.5.2"
vendor: "Apple"
reports:
  - "OE11056723602317"
  - "OE1105656414058"
  - "OE1105676929943"
timeline:
  - date: "2026-04-14"
    event: "Review Large Files surface reported (OE1105656414058)"
    resolved: false
  - date: "2026-04-19"
    event: "Maps proxy and Mail share sheet surfaces reported (OE11056723602317, OE1105676929943)"
    resolved: false
  - date: "2026-05-06"
    event: "All three closed by Apple Product Security with an identical response"
    resolved: false
  - date: "2026-07-30"
    event: "Published. Behavior still reproduces on the current release."
    resolved: true
---

When you long-press an app on iOS and choose **Require Face ID**, the system tells you what the setting does. It does not only say the app will require authentication to open. It says the app will require authentication to open *or show content in other apps*.

That second clause is a specific promise about system-wide behavior, and it is the one this writeup is about. The three surfaces below all reach content belonging to a Face ID–locked app, from outside that app, with no authentication prompt at any step. Stolen Device Protection set to Always does not change the outcome.

None of these require an exploit, a jailbreak, a developer account, or a crafted file. They are ordinary navigation paths through first-party software.

## Threat model

The relevant attacker is the one App Lock and Stolen Device Protection are designed for: someone holding your unlocked device, or holding your device and your passcode, without your biometrics. A partner, a coworker, a thief who watched you type your passcode. That is the scenario Apple markets these features against.

## Surface 1 — Maps as a proxy into Phone and FaceTime

Phone and FaceTime can be locked with Face ID. Maps cannot — Apple documents that Maps and Contacts are among the built-in apps that cannot be locked.

Both can place calls.

1. Enable Stolen Device Protection, set to Always
2. Long-press Phone, tap Require Face ID. Repeat for FaceTime
3. Open Maps, search any business with a listed number
4. Tap the number to place the call
5. In the in-call UI, tap More, then Add People

At step 5 the complete Contacts list is displayed with no biometric prompt. From there: Recents, Favorites, the keypad, the ability to view and edit any contact, to merge or drop the original call and leave an active call to someone else entirely, and to start a FaceTime session with any contact. Call history can be deleted afterward.

The lock is on the front door. Maps is a side door that cannot be locked.

## Surface 2 — iCloud storage management

The Files app can be locked with Face ID and excluded from system search. Neither setting governs the storage management interface.

1. Files locked with Require Face ID, Stolen Device Protection set to Always
2. Settings → Search → Apps → Files, turn off every toggle
3. Settings → [Apple ID] → iCloud → Drive → Manage Storage → **Review Large Files**

The contents of iCloud Drive are listed. Tapping an item opens it — photos, videos, documents — with no Face ID prompt. Items can be viewed, captured by screenshot, shared, or deleted.

This surface is write-capable, which distinguishes it from the others. An attacker can destroy files, not only read them.

## Surface 3 — Mail share sheet from Spotlight

Apple patched this class for Messages in iOS 26.4. It still reproduces in Mail.

1. Files locked with Require Face ID, Mail locked with Require Face ID, Stolen Device Protection set to Always
2. Open Spotlight, search a filename stored in the locked Files app
3. Tap share on the result
4. Select Mail

No prompt appears at any step. The file is attached to a message composed from the account holder's own address, with the account's Hide My Email relay addresses selectable, and can be sent to any recipient.

That the same enforcement gap was considered worth fixing for Messages one release earlier is the relevant context here.

## Vendor response

All three reports were closed on the same day with the same paragraph, reproduced verbatim in the pull quote above. It was returned three times to three different findings.

The response is a reasonable description of what Locked and Hidden Apps are scoped to do. It does not engage the specific claim, which is not that App Lock should remove all traces of an app from the system. It is that the setting's own description promises content will not show in other apps, and these three surfaces show content in other apps.

Two readings are available and both are actionable. Either the enforcement is incomplete and these paths should be gated, or the enforcement is working as designed and the setting's description overstates what it covers. A user who reads the toggle and then sees their locked app's contents in Settings has been given a security expectation the system does not meet.

## What a fix looks like

Gating each of these three surfaces behind the same biometric requirement the parent app carries would close them. Where a surface genuinely cannot be gated — a proxy app that cannot itself be locked — the honest alternative is to amend the setting's description so it stops promising coverage the system does not provide. A user who sees no promise correctly infers no protection.

## Disclosure

Reported to Apple Product Security in April 2026. Closed in May 2026. Published after the standard 90-day window with the behavior still reproducing on the current public release. No exploit code is included and none is required.
