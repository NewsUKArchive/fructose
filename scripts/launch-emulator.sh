#!/bin/bash
emulator -avd Nexus_5X_API_24 &
sleep 15
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811