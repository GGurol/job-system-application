import React from 'react';

type JobCardProps = {
  title: string;
  company: string;
  location?: string | null;
  createdAt?: string | null;
};

export default function JobCard({ title, company, location, createdAt }: JobCardProps){
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-gray-700">{company}{location ? ` — ${location}` : ''}</p>
        </div>
        {createdAt && <span className="text-xs text-gray-500">{new Date(createdAt).toLocaleDateString()}</span>}
      </div>
    </div>
  );
}
