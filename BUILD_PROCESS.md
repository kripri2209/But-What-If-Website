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

The Website was made to have an intial loading screen , a white screen showcasing the question , and a white bubble prompting to question everything , then the chat interface page .




