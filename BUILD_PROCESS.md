#Build process for the website " Devil's Advocate."


    23 February 2026 - 24 February 2026

I started by analyzing the assignment requirements and defining what the system should actually do. The core requirement was to accept multiple options, evaluate them using criteria with weights, and produce an explainable recommendation.

Initially, the idea was a simple comparison tool, but I refined it into a “Devil’s Advocate” decision system where the system not only ranks options but also highlights risks and challenges of the decision.

Initial system components identified:
Input Layer
Decision Scoring Engine
Risk Analysis
Bias Detection
Explanation Generator

I also chose a web app approach so the system is interactive and easy to test.


    25th February 2026
    
I started by building a very quick prototype to test the core idea of the decision system.

Goal of the prototype:
- Accept options
- Accept criteria
- Calculate a score
- Return a ranked result


    26th February 2026
Initial Issue
-The first version of the website was not producing outputs.
-Investigation revealed that OpenAI credits were depleted, which caused the chat interface to fail.

Model Change
-Switched from the OpenAI model to a Groq model to restore functionality.

Interface Observation
-The chat interface worked again, but it looked very basic and overly “AI-like.”


    27th February 2026
Chat Interface
-The chat interface was kept mostly the same to maintain functionality.

UI Direction Change
-The main UI was redesigned.
-the design shifted from a generic AI-generated web layout to a more structured, military-style aesthetic.
-New Idea
--Decided to introduce an interactive screen loading experience instead of a static loading page.

Technology Exploration
-Experimented with animation tools such as:
GSAP
-GSAP timeline
-Implementation
-Built a Gemini-inspired interactive screen using:
HTML,CSS,JavaScript,GSAP animations
-This loading screen simulates a thinking / processing interface, making the experience feel more intelligent and intentional.

    28th February 2026
Various other AI were researched and considered.

    1st March 2026
The first fully working initial website was made . Chat interface showed error , yet to be fixed and finalized.
Grok , Supabase and Copliot were majorly used AI. 

Initially, the API returned 500 errors because the route.ts file contained incomplete code. This was fixed by copying the full implementation from the source code version, which highlighted the importance of verifying which files Next.js actually uses for routing.

Next, the server failed to start because port 3000 was already in use. This happened because previous Node processes were still running in the background. The issue was resolved by killing the processes before restarting the server.

Even after fixing the code, the API continued failing because the server had not restarted with the updated code. Restarting the server solved the problem and showed that API route changes require a full restart.

The Website was made to have an intial loading screen , a white screen showcasing the question , and a white bubble prompting to question everything , then the chat interface page .

    2nd March 2026
The Website Chat inteface was fixed . the Website initial plan has worked and further improvements were considered.
Later, the AI responses sounded too lecture-like and educational. Based on feedback, the system prompts were rewritten with a clearer structure and a more skeptical tone so the AI stayed in character.

Another issue appeared with formatting: bullet points were displayed as a paragraph. This was fixed by using the CSS property white-space: pre-wrap, which preserves line breaks.

Finally, a checkpoint of the project was saved after the debugging process. Backup files were created for the API route, environment configuration, chat interface, and documentation so the working state could be restored if future changes caused problems.

    3rd March 2026
basic UI of website was changed from dark theme to light theme . Various options of the users input were to be considered and a tab style folder response for the Advocates reponse was considered.

    4th March 2026
i researchedd on how to make the AI more critical about the user's choice , and also began working on the Diagrams for the system . 
I used canva to create the diagrams.
The UI style , was still uchanged and the previous idea was still worked upon.





