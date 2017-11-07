//events that a ship can face in the void
var shipSimEventObject = {  
   "topLevelEvents":[  
      {  
         "eventName":"Food Issues",
         "chanceOfHappening":0.4,
         "subEvents":[  
            {  
               "chanceOfHappening":0.35,
               "eventName":"Faulty Valve Vented Water",
               "eventSucessChance":0.3,
               "attributeToTest":"tech",
               "success":{  
                  "text":"Your crew managed to shut down the tank before it vented all the water in the port side.",
                  "statusChange":{  
                     "attribute":"tech",
                     "change":1
                  }
               },
               "failure":{  
                  "text":"Due to a faulty sensor no one caught that one of the main water tanks vented water into space.",
                  "statusChange":{  
                     "attribute":"food",
                     "change": -1
                  }
               }
            },
			{  
               "chanceOfHappening":0.5,
               "eventName":"Mold Found in LEMBAS Meal Wafers",
               "eventSucessChance":0.3,
               "attributeToTest":"tech",
               "success":{  
                  "text":"Your culinary staff managers to scrape off the mold and brew a beer like beverage.",
                  "statusChange":{  
                     "attribute":"food",
                     "change":1
                  }
               },
               "failure":{  
                  "text":"Your culinary staff finds that the moldy LEMBAS meal wafers cause intense vomiting.",
                  "statusChange":{  
                     "attribute":"morale",
                     "change": -1
                  }
               }
            },
			{  
               "chanceOfHappening":0.7,
               "eventName":"Comet Found Containing Tons of Fresh Water.",
               "eventSucessChance":0.8,
               "attributeToTest":"tech",
               "success":{  
                  "text":"Your crew is able to extract tons of fresh water.",
                  "statusChange":{  
                     "attribute":"food",
                     "change":2
                  }
               },
               "failure":{  
                  "text":"The extraction goes badly and you lose several of your smaller ships.",
                  "statusChange":{  
                     "attribute":"tech",
                     "change": -1
                  }
               }
            },
			{  
               "chanceOfHappening":1,
               "eventName":"Bumper Crops",
               "eventSucessChance":0.6,
               "attributeToTest":"energy",
               "success":{  
                  "text":"You have rerouted the ship's excess heat to the mold vats and have increased the food yeild.",
                  "statusChange":{  
                     "attribute":"food",
                     "change":2
                  }
               },
               "failure":{  
                  "text":"You tried rerouting the heat from the ship's engines to the mold vats and only have succeded in making it warm.",
                  "statusChange":{  
                     "attribute":"food",
                     "change": 0
                  }
               }
            }
         ]
      },
	{  
         "eventName":"Tech Issues",
         "chanceOfHappening":0.7,
         "subEvents":[  
            {  
               "chanceOfHappening":0.35,
               "eventName":"Main Reactor Upgrade",
               "eventSucessChance":0.7,
               "attributeToTest":"tech",
               "success":{  
                  "text":"Engineering managers to upgrade the main reactor and double its output.",
                  "statusChange":{  
                     "attribute":"energy",
                     "change":1
                  }
               },
               "failure":{  
                  "text":"Due to a welding error the main reactor vented drive plasma into space.",
                  "statusChange":{  
                     "attribute":"energy",
                     "change": -1
                  }
               }
            },
			{  
               "chanceOfHappening":0.5,
               "eventName":"Entertainment Systems Break",
               "eventSucessChance":0.3,
               "attributeToTest":"tech",
               "success":{  
                  "text":"Engineering manages to fix the issue with a system reboot.",
                  "statusChange":{  
                     "attribute":"morale",
                     "change":1
                  }
               },
               "failure":{  
                  "text":"Half of entertainment system modules are now beyond repair.",
                  "statusChange":{  
                     "attribute":"morale",
                     "change": -1
                  }
               }
            },
			{  
               "chanceOfHappening":0.7,
               "eventName":"Ship Systems Become Self Aware",
               "eventSucessChance":0.5,
               "attributeToTest":"morale",
               "success":{  
                  "text":"The new AI sees itself as a part of the crew and agrees to help anyway it can.",
                  "statusChange":{  
                     "attribute":"tech",
                     "change":2
                  }
               },
               "failure":{  
                  "text":"The AI quickly falls into insanity and the main memory units have to be ejected.",
                  "statusChange":{  
                     "attribute":"tech",
                     "change": -2
                  }
               }
            },
			{  
               "chanceOfHappening":1,
               "eventName":"Internal Network Connections are Corroding",
               "eventSucessChance":0.8,
               "attributeToTest":"tech",
               "success":{  
                  "text":"Engineering is able to repair the damage.",
                  "statusChange":{  
                     "attribute":"tech",
                     "change":0
                  }
               },
               "failure":{  
                  "text":"Engineering is unable to save networking connections and now has to use wireless systems.",
                  "statusChange":{  
                     "attribute":"energy",
                     "change": -1
                  }
               }
            }
         ]
      },
	{  
         "eventName":"Moral Issues",
         "chanceOfHappening":1,
         "subEvents":[  
            {  
               "chanceOfHappening":0.5,
               "eventName":"Depression runs rampant thru the ship with no end in sight",
               "eventSucessChance":0.3,
               "attributeToTest":"food",
               "success":{  
                  "text":"As captain you create a new holiday known hence forth as Ship Day.",
                  "statusChange":{  
                     "attribute":"morale",
                     "change":1
                  }
               },
               "failure":{  
                  "text":"Some people give into the sadness and embrace the void by airlocking themselves",
                  "statusChange":{  
                     "attribute":"people",
                     "change": -1
                  }
               }
            },
			{  
               "chanceOfHappening":1,
               "eventName":"New religion rises that places the ship and its crew as the chosen people",
               "eventSucessChance":0.4,
               "attributeToTest":"tech",
               "success":{  
                  "text":"People of the ship feel a renewed sense of purpose",
                  "statusChange":{  
                     "attribute":"morale",
                     "change":2
                  }
               },
               "failure":{  
                  "text":"Most people mock this belief and continue with their day to day lives",
                  "statusChange":{  
                     "attribute":"morale",
                     "change": 0
                  }
               }
            }
         ]
      }
   ]
};