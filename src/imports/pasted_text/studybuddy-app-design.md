Design a complete mobile application UI for "StudyBuddy" — an online platform                                                                                                                         
    for finding study partners based on subjects, schedules, and interests.                                                                                                                               
    Target audience: university/college students aged 18–25.                                                                                                                                              
                                                                                                                                                                                                          
    DESIGN STYLE:                                                                                                                                                                                         
    - Modern, clean, and youthful aesthetic                                                                                                                                                               
    - Rounded corners, soft shadows, and glassmorphism accents                                                                                                                                            
    - Primary color palette: vibrant indigo/purple (#6C63FF) with warm coral                                                                                                                              
      accents (#FF6B6B), neutral dark (#1E1E2E), and light background (#F5F5FA)                                                                                                                           
    - Typography: clean sans-serif (Inter or Poppins), bold headings,                                                                                                                                     
      readable body text                                                                                                                                                                                  
    - Friendly illustrations and avatar placeholders                                                                                                                                                      
    - Consistent 8px spacing grid                                                                                                                                                                         
    - Dark mode variant preferred                                                                                                                                                                         
                                                                                                                                                                                                          
    SCREENS TO DESIGN:                                                                                                                                                                                    
                                                                                                                                                                                                          
    1. ONBOARDING / SPLASH                                                                                                                                                                                
       - App logo "StudyBuddy" with a friendly mascot or book+people icon                                                                                                                                 
       - Swipeable onboarding slides: "Find Study Partners", "Schedule Together",                                                                                                                         
         "Learn Better"                                                                                                                                                                                   
       - Sign Up / Log In buttons                                                                                                                                                                         
                                                                                                                                                                                                          
    2. SIGN UP & PROFILE SETUP                                                                                                                                                                            
       - Sign up with email, Google, or university SSO                                                                                                                                                    
       - Profile setup flow: name, university, study program, courses enrolled,                                                                                                                           
         interests/topics, available schedule (weekly time-slot picker),                                                                                                                                  
         profile photo upload                                                                                                                                                                             
                                                                                                                                                                                                          
    3. HOME / DASHBOARD                                                                                                                                                                                   
       - Greeting with user's first name and avatar                                                                                                                                                       
       - "Recommended Study Partners" horizontal card carousel showing:                                                                                                                                   
         student name, avatar, shared courses badge, schedule match percentage,                                                                                                                           
         status indicator (online/offline/studying/busy/available)                                                                                                                                        
       - "Recommended Study Groups" section with group cards showing topic,                                                                                                                               
         member count, and next session time                                                                                                                                                              
       - Quick-action buttons: Search, Create Group, Schedule Session                                                                                                                                     
       - Bottom navigation bar: Home, Search, Schedule, Chat, Profile                                                                                                                                     
                                                                                                                                                                                                          
    4. SEARCH SCREEN                                                                                                                                                                                      
       - Top search bar with placeholder "Search students, courses, topics..."                                                                                                                            
       - Filter chips/tabs: By Course, By Study Program, By Topic, By Username                                                                                                                            
       - Search results as user cards with: avatar, name, university,                                                                                                                                     
         study program, shared courses, online status dot indicator,                                                                                                                                      
         "Connect" / "Invite to Study" button                                                                                                                                                             
       - Empty state illustration when no results found                                                                                                                                                   
                                                                                                                                                                                                          
    5. STUDENT PROFILE (Other User)                                                                                                                                                                       
       - Cover photo area + avatar + name + university + study program                                                                                                                                    
       - Status badge (Online / Offline / Currently Studying / Busy /                                                                                                                                     
         Available for Study) with colored indicator                                                                                                                                                      
       - "Courses" section listing enrolled courses                                                                                                                                                       
       - "Interests" as tag chips                                                                                                                                                                         
       - "Available Schedule" as a mini weekly calendar heatmap                                                                                                                                           
       - Action buttons: "Send Message", "Invite to Study Session",                                                                                                                                       
         "Add to Study Group"                                                                                                                                                                             
                                                                                                                                                                                                          
    6. RECOMMENDATIONS SCREEN                                                                                                                                                                             
       - Section: "Students with Same Courses" — list of student cards                                                                                                                                    
         with course-match badges                                                                                                                                                                         
       - Section: "Schedule-Compatible Partners" — cards showing                                                                                                                                          
         overlapping free time slots highlighted                                                                                                                                                          
       - Section: "Study Groups for You" — group cards with topic tags,                                                                                                                                   
         member avatars stacked, match percentage                                                                                                                                                         
                                                                                                                                                                                                          
    7. SCHEDULING / CALENDAR SCREEN                                                                                                                                                                       
       - Monthly calendar view with dots indicating scheduled study sessions                                                                                                                              
       - List view toggle showing upcoming sessions as cards:                                                                                                                                             
         session title, participants (stacked avatars), date/time,                                                                                                                                        
         location or "Online", subject/topic tag                                                                                                                                                          
       - "Create Study Session" FAB or button leading to a form:                                                                                                                                          
         title, date/time picker, invite participants, add topic,                                                                                                                                         
         set reminder toggle                                                                                                                                                                              
       - Reminder settings: 15min / 30min / 1hr before                                                                                                                                                    
       - Notification banner for schedule changes                                                                                                                                                         
                                                                                                                                                                                                          
    8. CHAT — CONVERSATIONS LIST                                                                                                                                                                          
       - Tab switcher: "Private" | "Groups"                                                                                                                                                               
       - Chat list items: avatar (or group icon), name, last message preview,                                                                                                                             
         timestamp, unread badge count, online status dot                                                                                                                                                 
       - Search bar to find conversations                                                                                                                                                                 
       - FAB to start new chat                                                                                                                                                                            
                                                                                                                                                                                                          
    9. CHAT — CONVERSATION VIEW (Private & Group)                                                                                                                                                         
       - Chat header: avatar, name, status ("Online", "Studying Biology"),                                                                                                                                
         video/call icon buttons                                                                                                                                                                          
       - Message bubbles with timestamps, read receipts                                                                                                                                                   
       - Shared file/note cards inline (PDF, image, document previews                                                                                                                                     
         with download button)                                                                                                                                                                            
       - Input bar: text field, attach file button, emoji button, send button                                                                                                                             
       - For group chat: member list sidebar or drawer, group info header                                                                                                                                 
         with member count                                                                                                                                                                                
                                                                                                                                                                                                          
    10. CHAT ROOM / VIRTUAL STUDY ROOM                                                                                                                                                                    
        - Video call-style layout with participant tiles (camera on/off)                                                                                                                                  
        - Screen share area                                                                                                                                                                               
        - Sidebar chat panel                                                                                                                                                                              
        - Timer/Pomodoro widget for timed study sessions                                                                                                                                                  
        - "End Session" and "Mute" controls                                                                                                                                                               
        - Participant status indicators                                                                                                                                                                   
                                                                                                                                                                                                          
    11. NOTIFICATIONS SCREEN                                                                                                                                                                              
        - List of notifications: new study partner recommendations,                                                                                                                                       
          session reminders, schedule changes, new messages,                                                                                                                                              
          group invitations                                                                                                                                                                               
        - Each notification with icon, title, description, timestamp,                                                                                                                                     
          read/unread styling                                                                                                                                                                             

    12. USER PROFILE (Own)
        - Editable profile info: photo, name, bio, university,
          study program, courses, interests
        - "My Schedule" editable weekly availability grid
        - "My Study Groups" list
        - "Study Stats" card: total sessions, study hours, partners connected
        - Settings gear icon → App settings, notification preferences,
          dark mode toggle, logout

    COMPONENT LIBRARY:
    - Design a reusable component set including: buttons (primary, secondary,
      ghost), input fields, cards, avatars with status dots, tag chips,
      navigation bar, tab bar, modals, toast notifications, calendar
      components, chat bubbles, file attachment cards

    Make all screens feel cohesive, student-friendly, and visually engaging
    with micro-interactions noted (hover states, pressed states, transitions).
    Use consistent iconography (outline style, e.g., Phosphor or Feather icons).