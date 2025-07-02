'use client';

import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { getContactsAction, deleteContactAction, markAsReadAction, type Contact } from '@/app/actions';
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
import { Loader2, ShieldCheck, ShieldOff, MoreHorizontal, Trash2, Eye, Copy, Download, User, Phone, Mail } from 'lucide-react';
import Logo from '@/components/logo';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('unread');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

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

  const fetchContacts = async () => {
    setIsLoading(true);
    setError('');
    const result = await getContactsAction();
    if (result.contacts) {
      setContacts(result.contacts);
    } else if (result.error) {
      setError(result.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  const handleViewContact = async (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewDialogOpen(true);
    if (!contact.read) {
      const result = await markAsReadAction(contact.id);
      if (result.success) {
        setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, read: true } : c));
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error });
      }
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;
    const result = await deleteContactAction(contactToDelete.id);
    if (result.success) {
      setContacts(prev => prev.filter(c => c.id !== contactToDelete.id));
      toast({ title: "Success", description: "Contact deleted." });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setContactToDelete(null);
  };
  
  const handleCopyLead = (contact: Contact) => {
    const leadInfo = `Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}`;
    navigator.clipboard.writeText(leadInfo);
    toast({ title: "Copied!", description: "Lead info copied to clipboard." });
  };
  
  const unreadContacts = useMemo(() => contacts.filter(c => !c.read), [contacts]);
  const displayedContacts = activeTab === 'unread' ? unreadContacts : contacts;

  const exportToCSV = () => {
    if(displayedContacts.length === 0) {
      toast({ variant: "destructive", title: "Nothing to Export", description: "There are no contacts in the current view." });
      return;
    }
    const headers = 'Name,Email,Phone,Message,Received At\n';
    const csvContent = displayedContacts.map(c => 
      `"${c.name}","${c.email}","${c.phone}","${c.message.replace(/"/g, '""')}","${c.createdAt}"`
    ).join('\n');

    const fullCsv = headers + csvContent;
    navigator.clipboard.writeText(fullCsv);
    toast({ title: "Exported to Clipboard", description: "Visible contacts have been copied as CSV." });
  };


  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center gap-3">
              <Logo />
              <span className="font-bold text-xl">Delvare</span>
            </div>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>Enter password to access contact list</CardDescription>
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
                <ShieldCheck className="mr-2" /> Login
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
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-headline">Admin Panel</h1>
                <p className="text-muted-foreground">View contact form submissions.</p>
              </div>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                <ShieldOff className="mr-2"/> Logout
              </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="unread">
                  Unread <Badge className="ml-2 bg-primary text-primary-foreground">{unreadContacts.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="all">
                  All <Badge variant="secondary" className="ml-2">{contacts.length}</Badge>
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2"/> Export Visible
              </Button>
            </div>
            
            <TabsContent value="unread">
              <ContactsTable contacts={unreadContacts} isLoading={isLoading} error={error} onView={handleViewContact} onCopy={handleCopyLead} onDelete={setContactToDelete} />
            </TabsContent>
            <TabsContent value="all">
              <ContactsTable contacts={contacts} isLoading={isLoading} error={error} onView={handleViewContact} onCopy={handleCopyLead} onDelete={setContactToDelete} />
            </TabsContent>
          </Tabs>

        </div>
      </div>

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>Full message from {selectedContact?.name}.</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="grid gap-4 py-4 text-sm">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium text-muted-foreground flex items-center gap-2"><User/> Name</div>
                <div>{selectedContact.name}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium text-muted-foreground flex items-center gap-2"><Mail/> Email</div>
                <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">{selectedContact.email}</a>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium text-muted-foreground flex items-center gap-2"><Phone/> Phone</div>
                <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">{selectedContact.phone}</a>
              </div>
              <Separator />
              <div className="grid gap-2">
                <div className="font-medium text-muted-foreground">Message</div>
                <p className="p-4 bg-secondary rounded-md max-h-[300px] overflow-y-auto">{selectedContact.message}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!contactToDelete} onOpenChange={(open) => !open && setContactToDelete(null)}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the contact submission from {contactToDelete?.name}.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setContactToDelete(null)}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// ContactsTable Component
interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
  error: string;
  onView: (contact: Contact) => void;
  onCopy: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

function ContactsTable({ contacts, isLoading, error, onView, onCopy, onDelete }: ContactsTableProps) {
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
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <TableRow key={contact.id} className={!contact.read ? 'font-bold' : 'font-normal'}>
                      <TableCell>
                        {!contact.read && <Badge>New</Badge>}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{contact.createdAt}</TableCell>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col min-w-[200px]">
                          <span className="truncate">{contact.email}</span>
                          <span className="text-muted-foreground">{contact.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate">{contact.message}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView(contact)}><Eye className="mr-2"/> View Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onCopy(contact)}><Copy className="mr-2"/> Copy Lead</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDelete(contact)} className="text-destructive focus:text-destructive focus:bg-destructive/10"><Trash2 className="mr-2"/> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No contact submissions in this view.
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
