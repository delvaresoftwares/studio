'use client';

import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { getContactsAction, deleteContactAction, markAsReadAction, getEstimationsAction, deleteEstimationAction, markEstimationAsReadAction, type Contact, type Estimation } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, ShieldOff, MoreHorizontal, Trash2, Eye, Copy, Download, User, Phone, Mail, Calculator, FileText } from 'lucide-react';
import Logo from '@/components/logo';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [estimations, setEstimations] = useState<Estimation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [mainTab, setMainTab] = useState('contacts');
  const [activeTab, setActiveTab] = useState('unread');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedEstimation, setSelectedEstimation] = useState<Estimation | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'contacts' | 'estimations', name: string } | null>(null);

  const { toast } = useToast();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'delvareadmin1212') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [contactsResult, estimationsResult] = await Promise.all([
        getContactsAction(),
        getEstimationsAction()
      ]);

      if (contactsResult.contacts) setContacts(contactsResult.contacts);
      if (estimationsResult.estimations) setEstimations(estimationsResult.estimations);

      if (contactsResult.error || estimationsResult.error) {
        setError(contactsResult.error || estimationsResult.error || 'Failed to fetch some data.');
      }
    } catch (e) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleViewContact = async (contact: Contact) => {
    setSelectedContact(contact);
    setSelectedEstimation(null);
    setIsViewDialogOpen(true);
    if (!contact.read) {
      const result = await markAsReadAction(contact.id);
      if (result.success) {
        setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, read: true } : c));
      }
    }
  };

  const handleViewEstimation = async (estimation: Estimation) => {
    setSelectedEstimation(estimation);
    setSelectedContact(null);
    setIsViewDialogOpen(true);
    if (!estimation.read) {
      const result = await markEstimationAsReadAction(estimation.id);
      if (result.success) {
        setEstimations(prev => prev.map(e => e.id === estimation.id ? { ...e, read: true } : e));
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    const result = itemToDelete.type === 'contacts'
      ? await deleteContactAction(itemToDelete.id)
      : await deleteEstimationAction(itemToDelete.id);

    if (result.success) {
      if (itemToDelete.type === 'contacts') {
        setContacts(prev => prev.filter(c => c.id !== itemToDelete.id));
      } else {
        setEstimations(prev => prev.filter(e => e.id !== itemToDelete.id));
      }
      toast({ title: "Success", description: "Item deleted." });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setItemToDelete(null);
  };

  const handleCopyLead = (item: Contact | Estimation) => {
    let leadInfo = '';
    if ('email' in item) {
      leadInfo = `Name: ${item.name}\nEmail: ${item.email}\nPhone: ${item.phone}`;
    } else {
      leadInfo = `Project: ${item.projectType}\nLocation: ${item.location}\nCost: ${item.estimatedCost} ${item.currency}`;
    }
    navigator.clipboard.writeText(leadInfo);
    toast({ title: "Copied!", description: "Lead info copied to clipboard." });
  };

  const unreadContacts = useMemo(() => contacts.filter(c => !c.read), [contacts]);
  const unreadEstimations = useMemo(() => estimations.filter(e => !e.read), [estimations]);

  const exportToCSV = () => {
    const data = mainTab === 'contacts' ? (activeTab === 'unread' ? unreadContacts : contacts) : (activeTab === 'unread' ? unreadEstimations : estimations);
    if (data.length === 0) {
      toast({ variant: "destructive", title: "Nothing to Export", description: "There are no items in the current view." });
      return;
    }

    let csvContent = '';
    if (mainTab === 'contacts') {
      const headers = 'Name,Email,Phone,Message,Received At\n';
      csvContent = headers + (data as Contact[]).map(c =>
        `"${c.name}","${c.email}","${c.phone}","${c.message.split('"').join('""')}","${c.createdAt}"`
      ).join('\n');
    } else {
      const headers = 'Type,Location,Urgency,Complexity,Cost,Currency,Received At\n';
      csvContent = headers + (data as Estimation[]).map(e =>
        `"${e.projectType}","${e.location}","${e.urgency}","${e.complexity}","${e.estimatedCost}","${e.currency}","${e.createdAt}"`
      ).join('\n');
    }

    navigator.clipboard.writeText(csvContent);
    toast({ title: "Exported to Clipboard", description: "Visible items have been copied as CSV." });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center scale-125">
              <Logo />
            </div>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>Enter password to access dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {authError && <p className="text-sm text-destructive">{authError}</p>}
              <Button type="submit" className="w-full">
                <ShieldCheck className="mr-2 h-4 w-4" /> Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Logo />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-headline">Admin Panel</h1>
                <p className="text-muted-foreground">Manage your studio leads and inquiries.</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              <ShieldOff className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>

          <Tabs value={mainTab} onValueChange={setMainTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
              <TabsTrigger value="contacts"><User className="mr-2 h-4 w-4" /> Contacts</TabsTrigger>
              <TabsTrigger value="estimations"><Calculator className="mr-2 h-4 w-4" /> Estimations</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="unread">
                  Unread <Badge className="ml-2 bg-primary text-primary-foreground">
                    {mainTab === 'contacts' ? unreadContacts.length : unreadEstimations.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="all">
                  All <Badge variant="secondary" className="ml-2">
                    {mainTab === 'contacts' ? contacts.length : estimations.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>

            <TabsContent value="unread">
              <DataTable
                type={mainTab as 'contacts' | 'estimations'}
                data={mainTab === 'contacts' ? unreadContacts : unreadEstimations}
                isLoading={isLoading}
                error={error}
                onView={mainTab === 'contacts' ? handleViewContact : handleViewEstimation}
                onCopy={handleCopyLead}
                onDelete={(id, name) => setItemToDelete({ id, name, type: mainTab as 'contacts' | 'estimations' })}
              />
            </TabsContent>
            <TabsContent value="all">
              <DataTable
                type={mainTab as 'contacts' | 'estimations'}
                data={mainTab === 'contacts' ? contacts : estimations}
                isLoading={isLoading}
                error={error}
                onView={mainTab === 'contacts' ? handleViewContact : handleViewEstimation}
                onCopy={handleCopyLead}
                onDelete={(id, name) => setItemToDelete({ id, name, type: mainTab as 'contacts' | 'estimations' })}
              />
            </TabsContent>
          </Tabs>

        </div>
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedContact ? 'Contact Details' : 'Estimation Details'}</DialogTitle>
            <DialogDescription>
              Full inquiry from {selectedContact ? selectedContact.name : 'the cost estimator'}.
            </DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="grid gap-4 py-4 text-sm">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Name</div>
                <div>{selectedContact.name}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4" /> Type</div>
                <div><Badge variant="outline" className="capitalize">{selectedContact.type}</Badge></div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4" /> Email</div>
                <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">{selectedContact.email}</a>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</div>
                <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">{selectedContact.phone}</a>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="font-medium text-muted-foreground">Message</div>
                <p className="p-4 bg-secondary rounded-md max-h-[300px] overflow-y-auto whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>
          )}

          {selectedEstimation && (
            <div className="grid gap-4 py-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="font-medium text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4" /> Type</div>
                  <div className="capitalize">{selectedEstimation.projectType}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-muted-foreground flex items-center gap-2"><Mail className="h-4 w-4" /> Location</div>
                  <div>{selectedEstimation.location}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="font-medium text-muted-foreground">Urgency</div>
                  <Badge variant="outline" className="capitalize">{selectedEstimation.urgency}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-muted-foreground">Complexity</div>
                  <Badge variant="outline" className="capitalize">{selectedEstimation.complexity}</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="font-medium text-muted-foreground">Estimated Cost</div>
                <div className="text-3xl font-bold text-primary">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedEstimation.currency, minimumFractionDigits: 0 }).format(selectedEstimation.estimatedCost)}
                </div>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="font-medium text-muted-foreground">Project Description</div>
                <p className="p-4 bg-secondary rounded-md max-h-[150px] overflow-y-auto whitespace-pre-wrap">{selectedEstimation.projectDescription}</p>
              </div>
              <div className="grid gap-2">
                <div className="font-medium text-muted-foreground">Justification</div>
                <p className="p-4 bg-muted/50 rounded-md max-h-[150px] overflow-y-auto text-xs whitespace-pre-wrap">{selectedEstimation.costJustification}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this {itemToDelete?.type} from {itemToDelete?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// DataTable Component
interface DataTableProps {
  type: 'contacts' | 'estimations';
  data: any[];
  isLoading: boolean;
  error: string;
  onView: (item: any) => void;
  onCopy: (item: any) => void;
  onDelete: (id: string, name: string) => void;
}

function DataTable({ type, data, isLoading, error, onView, onCopy, onDelete }: DataTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Fetching Data</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>Received</TableHead>
                {type === 'contacts' ? (
                  <>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Message</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                  </>
                )}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((item) => (
                  <TableRow key={item.id} className={!item.read ? 'font-bold' : 'font-normal'}>
                    <TableCell>
                      {!item.read && <Badge>New</Badge>}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs">{item.createdAt}</TableCell>

                    {type === 'contacts' ? (
                      <>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "capitalize",
                            item.type === 'career' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          )}>
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col text-xs">
                            <span>{item.email}</span>
                            <span className="text-muted-foreground">{item.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-xs">{item.message}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="capitalize">{item.projectType}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell className="text-primary font-bold">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency, minimumFractionDigits: 0 }).format(item.estimatedCost)}
                        </TableCell>
                      </>
                    )}

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView(item)}><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCopy(item)}><Copy className="mr-2 h-4 w-4" /> Copy Info</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onDelete(item.id, type === 'contacts' ? item.name : item.projectType)} className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No inquiries in this view.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
