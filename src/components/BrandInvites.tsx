
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrandInvite } from '@/types';
import { Calendar, DollarSign, Eye } from 'lucide-react';

const mockInvites: BrandInvite[] = [
  {
    id: '1',
    brandName: 'TechGear Pro',
    offer: 1500,
    deadline: '2024-01-15',
    description: 'Review our latest wireless headphones for your tech audience',
    requirements: ['1 YouTube video', 'Instagram story series', 'Honest review'],
    status: 'pending',
    platform: 'youtube'
  },
  {
    id: '2',
    brandName: 'FitLife Supplements',
    offer: 800,
    deadline: '2024-01-20',
    description: 'Promote our new protein powder line',
    requirements: ['3 Instagram posts', 'Include discount code'],
    status: 'pending',
    platform: 'instagram'
  },
  {
    id: '3',
    brandName: 'StyleCo Fashion',
    offer: 2200,
    deadline: '2024-01-25',
    description: 'Spring collection fashion haul and styling tips',
    requirements: ['YouTube lookbook video', '5 Instagram posts', 'Twitter promotion'],
    status: 'accepted',
    platform: 'youtube'
  }
];

const BrandInvites = () => {
  const [invites, setInvites] = useState<BrandInvite[]>(mockInvites);
  const [selectedInvite, setSelectedInvite] = useState<BrandInvite | null>(null);

  const handleStatusUpdate = (inviteId: string, newStatus: BrandInvite['status']) => {
    setInvites(invites.map(invite => 
      invite.id === inviteId ? { ...invite, status: newStatus } : invite
    ));
    setSelectedInvite(null);
  };

  const getStatusColor = (status: BrandInvite['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedInvite) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{selectedInvite.brandName}</CardTitle>
              <CardDescription>Campaign Details</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setSelectedInvite(null)}>
              Back to List
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-lg">${selectedInvite.offer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{selectedInvite.deadline}</span>
              </div>
            </div>
            <Badge className={getStatusColor(selectedInvite.status)}>
              {selectedInvite.status}
            </Badge>
          </div>

          <div>
            <h4 className="font-medium mb-2">Campaign Description</h4>
            <p className="text-gray-600">{selectedInvite.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Requirements</h4>
            <ul className="list-disc list-inside space-y-1">
              {selectedInvite.requirements.map((req, index) => (
                <li key={index} className="text-gray-600">{req}</li>
              ))}
            </ul>
          </div>

          {selectedInvite.status === 'pending' && (
            <div className="flex space-x-3">
              <Button 
                onClick={() => handleStatusUpdate(selectedInvite.id, 'accepted')}
                className="bg-green-600 hover:bg-green-700"
              >
                Accept Offer
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleStatusUpdate(selectedInvite.id, 'declined')}
              >
                Decline
              </Button>
            </div>
          )}

          {selectedInvite.status === 'accepted' && (
            <Button 
              onClick={() => handleStatusUpdate(selectedInvite.id, 'ongoing')}
            >
              Mark as Started
            </Button>
          )}

          {selectedInvite.status === 'ongoing' && (
            <Button 
              onClick={() => handleStatusUpdate(selectedInvite.id, 'completed')}
            >
              Mark as Completed
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Brand Collaboration Invites</h2>
        <Badge variant="secondary">{invites.filter(i => i.status === 'pending').length} pending</Badge>
      </div>

      <div className="grid gap-4">
        {invites.map((invite) => (
          <Card key={invite.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium">{invite.brandName}</h3>
                    <Badge className={getStatusColor(invite.status)}>
                      {invite.status}
                    </Badge>
                    <Badge variant="outline">{invite.platform}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 max-w-md">{invite.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="font-medium">${invite.offer}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-blue-600" />
                      <span>Due {invite.deadline}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedInvite(invite)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandInvites;
