"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export interface WeightedCriterion {
  name: string;
  weight: number; // 1-10
}

interface WeightedCriteriaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (criteria: WeightedCriterion[]) => void;
  initialCriteria?: WeightedCriterion[];
}

export function WeightedCriteriaDialog({
  open,
  onOpenChange,
  onSave,
  initialCriteria = [],
}: WeightedCriteriaDialogProps) {
  const [criteria, setCriteria] = useState<WeightedCriterion[]>(
    initialCriteria.length > 0
      ? initialCriteria
      : [
          { name: "Financial Impact", weight: 5 },
          { name: "Time Investment", weight: 5 },
          { name: "Risk Level", weight: 5 },
        ]
  );
  const [newCriterionName, setNewCriterionName] = useState("");

  const addCriterion = () => {
    if (newCriterionName.trim() && criteria.length < 8) {
      setCriteria([...criteria, { name: newCriterionName.trim(), weight: 5 }]);
      setNewCriterionName("");
    }
  };

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  const updateWeight = (index: number, weight: number) => {
    const updated = [...criteria];
    updated[index].weight = weight;
    setCriteria(updated);
  };

  const handleSave = () => {
    onSave(criteria);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Set Decision Criteria Weights
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Define what matters most in your decision. Rate each criterion from 1 (least important) to 10 (most important).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Existing criteria */}
          {criteria.map((criterion, index) => (
            <div key={index} className="space-y-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{criterion.name}</Label>
                <button
                  onClick={() => removeCriterion(index)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  title="Remove criterion"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Slider
                  value={[criterion.weight]}
                  onValueChange={(value) => updateWeight(index, value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-semibold w-8 text-center text-blue-400">
                  {criterion.weight}
                </span>
              </div>
            </div>
          ))}

          {/* Add new criterion */}
          {criteria.length < 8 && (
            <div className="pt-2 border-t border-gray-700">
              <Label className="text-sm text-gray-400 mb-2 block">Add Custom Criterion</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Environmental Impact"
                  value={newCriterionName}
                  onChange={(e) => setNewCriterionName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCriterion()}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  maxLength={50}
                />
                <Button
                  onClick={addCriterion}
                  disabled={!newCriterionName.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add
                </Button>
              </div>
            </div>
          )}

          {criteria.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Add at least one criterion to evaluate your decision
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={criteria.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Weights
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
